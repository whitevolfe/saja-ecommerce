const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabaseConfig = {
  url: supabaseUrl ?? '',
  publishableKey: supabasePublishableKey ?? '',
};

export const invokeFunction = async <T>(functionName: string, body: unknown): Promise<T> => {
  if (!supabaseConfig.url || !supabaseConfig.publishableKey) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.');
  }

  const response = await fetch(`${supabaseConfig.url}/functions/v1/${functionName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseConfig.publishableKey,
      Authorization: `Bearer ${supabaseConfig.publishableKey}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || data?.message || 'Request failed.');
  }

  return data as T;
};
