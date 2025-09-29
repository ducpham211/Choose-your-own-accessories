import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

/**

 * @param {string | null} accessToken 
 * @returns {import("@supabase/supabase-js").SupabaseClient} Supabase client
 */
export const createSupabaseClient = (accessToken = null) => {
  const options = {};

  /* Nếu có token(để xác thực id của người dùng) -> gắn vào header Authorization cho mọi request -> gửi đến supabase để xác thực, vì một số
hàm cần auth.uid() = user.id */
  if (accessToken) {
    options.global = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  return createClient(SUPABASE_URL, SUPABASE_KEY, options);
};
