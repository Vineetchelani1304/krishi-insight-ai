import nodemailer from 'nodemailer';

const sendEmail = async (userEmail: string, workspaceName: string, addedBy: string): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'vineetchelani13@gmail.com',
                pass: 'kghe tvbm etel fcmf', // ⚠️ Use environment variables instead!
            },
        });

        // Verify transporter configuration
        transporter.verify((error, success) => {
            if (error) {
                console.error("Error configuring transporter:", error);
            } else {
                console.log("Transporter is ready to send emails");
            }
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: 'vineetchelani13@gmail.com',  // Use a valid email
            to: userEmail,
            subject: `You've been added to a new workspace: ${workspaceName}`,
            html: `
                <h2>Welcome to ${workspaceName}!</h2>
                <p>You have been added to the workspace <b>${workspaceName}</b> by <b>${addedBy}</b>.</p>
                <p>Click below to access your workspace:</p>
                <a href="#" style="background:#4CAF50; color:white; padding:10px 15px; text-decoration:none; border-radius:5px;">Go to Workspace</a>
                <p>Happy collaborating! 🚀</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`📧 Email sent to ${userEmail}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

// ✅ Export using ES Module syntax (Recommended for TS)
export default sendEmail;
