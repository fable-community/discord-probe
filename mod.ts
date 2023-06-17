import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';

serve(async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);

    const response = await fetch(
      `https://discord.com/api/users/${searchParams.get('id')}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bot ${Deno.env.get('BOT_TOKEN')}`,
        },
      },
    );

    const user = await response.json();

    if (user.avatar) {
      const response = await fetch(
        `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
      );

      return new Response(await response.arrayBuffer(), {
        headers: {
          'cache-control': `max-age=${86400 * 1}`,
        },
      });
    } else {
      throw new Error();
    }
  } catch {
    const response = await fetch(
      'https://cdn.discordapp.com/embed/avatars/0.png',
    );

    return response;
  }
});
