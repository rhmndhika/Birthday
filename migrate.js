import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = 'https://skhikshattzcxqjasflw.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'sb_publishable_9Y425L3H93GUHpRcyQdUyA_vw71dN1i';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("ENV Supabase belum lengkap");
}

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);


function base64ToBuffer(base64) {
  return Buffer.from(base64.split(",")[1], "base64");
}

async function migrate() {
  const { data: items, error } = await supabase
    .from("birthday_items")
    .select("id, album_photos");

  if (error) throw error;

  for (const item of items) {
    if (!item.album_photos?.length) continue;

    const migrated = [];

    for (let i = 0; i < item.album_photos.length; i++) {
      const photo = item.album_photos[i];

      if (!photo.url?.startsWith("data:image")) {
        migrated.push(photo);
        continue;
      }

      const buffer = base64ToBuffer(photo.url);
      const filePath = `${item.id}/${Date.now()}-${i}.jpg`;

      await supabase.storage
        .from("albums")
        .upload(filePath, buffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      const { data } = supabase.storage
        .from("albums")
        .getPublicUrl(filePath);

      migrated.push({
        ...photo,
        url: data.publicUrl,
      });
    }

    await supabase
      .from("birthday_items")
      .update({ album_photos: migrated })
      .eq("id", item.id);

    console.log(`✅ Migrated item ${item.id}`);
  }

  console.log("🎉 MIGRATION FINISHED");
}

migrate().catch(console.error);
