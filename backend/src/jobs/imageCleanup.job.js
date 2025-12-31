import cron from "node-cron"
import ImageMeta from "../models/imageMeta.model.js"
import imagekit from "../config/imagekit.js"

cron.schedule("0 * * * *", async () => {
  const expired = await ImageMeta.find({
    status: "temp",
    createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  })

  for (const img of expired) {
    await imagekit.deleteFile(img.fileId)
    await img.deleteOne()
  }

  console.log(`[CRON] cleaned ${expired.length} images`)
})
