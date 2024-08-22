import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'

dotenv.config();

const SUPABASE_URL = "https://wpljnoabsjzpkvjgtufr.supabase.co"
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwbGpub2Fic2p6cGt2amd0dWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyMjQ3NDAsImV4cCI6MjAzOTgwMDc0MH0.Y7PGfFCej5bILXDfrVWRteBwclLCUyK27GkaQlg4Fxc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);