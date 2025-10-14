import express, { Request, Response } from "express";
import axios from "axios";
import csvParser from "csv-parser";

interface CommodityData {
  commodity: string;
  state: string;
  currentPrice: number | null;
  market: string;
  date: string;
}

const app = express();
const PORT = 5000;

// Helper function to fetch and parse CSV from Agmarknet
async function fetchCommodityPrice(
  commodity: string,
  state: string
): Promise<CommodityData | null> {
  const url = `https://agmarknet.gov.in/PriceAndArrivals/DownloadPrices.aspx?Commodity=${encodeURIComponent(
    commodity
  )}&State=${encodeURIComponent(state)}`;

  try {
    const response = await axios.get(url, { responseType: "stream" });
    const results: any[] = [];

    return new Promise((resolve, reject) => {
      (response.data as NodeJS.ReadableStream)
        .pipe(csvParser())
        .on("data", (row: any) => results.push(row))
        .on("end", () => {
          if (results.length === 0) return resolve(null);

          // Assuming the latest price is the last row
          const latest = results[results.length - 1];
          resolve({
            commodity,
            state,
            currentPrice:
              parseFloat(latest["Modal Price (Rs./Quintal)"]) || null,
            market: latest["Market"],
            date: latest["Date"],
          });
        })
        .on("error", (err: Error) => reject(err));
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}

// API route
app.get(
  "/api/market/:commodity/:state",
  async (req: Request, res: Response): Promise<any> => {
    const { commodity, state } = req.params;
    const data = await fetchCommodityPrice(commodity, state);

    if (!data) return res.status(404).json({ error: "Data not found" });
    res.json(data);
  }
);
