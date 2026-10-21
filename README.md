# CommercialCleaning.com

Programmatic SEO site for commercial cleaning services across Canada (32 pages from master xlsx).

## Setup

```bash
npm install
npm run dev
```

## Regenerate pages from Excel

```bash
npm run generate:pages
```

Source file path is set in `scripts/generate-from-xlsx.py` (default: Downloads pSEO Commercial Cleaning xlsx).

## Environment

- `NEXT_PUBLIC_SITE_URL` — default `https://canadacommercialcleaners.com`
- `NEXT_PUBLIC_PHONE_DISPLAY` / `NEXT_PUBLIC_PHONE_E164`
