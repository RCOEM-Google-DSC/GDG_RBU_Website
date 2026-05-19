import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(() => {
  return new Response(
    JSON.stringify({
      ok: true,
      message: "awake",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
})
