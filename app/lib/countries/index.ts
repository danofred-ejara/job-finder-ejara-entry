import axios from "axios";

export interface GetCountriesOptions {
  q: string;
  limit: number;
  offset: number;
}

export interface Country {
  name: string;
  code: string;
  emoji: string;
}

export interface GetCountriesResult {
  data: Country[];
  meta: {
    count: number;
    limit: number;
    total: number;
    offset: number;
    more: boolean;
  };
}

export async function getCountries(
  options?: Partial<GetCountriesOptions>,
): Promise<GetCountriesResult> {
  const params = {
    ...options,
    response_fields: "names.common,flag.emoji,codes.alpha_2",
  };

  const apiKey = String(import.meta.env.VITE_RESTCOUNTRIES_API_KEY);

  const response = await axios.get(
    "https://api.restcountries.com/countries/v5",
    {
      params,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    },
  );

  const { meta, objects } = response.data.data;

  return {
    data: objects.map((c: any) => ({
      name: c.names.common,
      code: c.codes.alpha_2,
      emoji: c.flag.emoji,
    })),
    meta: {
      count: meta.count,
      limit: meta.limit,
      offset: meta.offset,
      total: meta.total,
      more: Boolean(meta.more),
    },
  };
}
