-- Add image support to doc_steps table
-- Run this in your Supabase SQL Editor

ALTER TABLE doc_steps 
ADD COLUMN image_url TEXT,
ADD COLUMN image_alt TEXT;