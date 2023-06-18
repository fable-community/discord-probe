import { serve } from 'https://deno.land/x/sift@0.6.0/mod.ts';

serve({
  '/user/:userId': async (_, __, params) => {
    try {
      const response = await fetch(
        `https://discord.com/api/users/${params?.userId}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'authorization': `Bot ${Deno.env.get('BOT_TOKEN')}`,
          },
        },
      );

      const user = await response.json();

      if (user) {
        return new Response(JSON.stringify(user), {
          headers: {
            'content-type': 'application/json',
            'cache-control': `max-age=${86400 * 1}`,
            'access-control-allow-origin': '*',
          },
        });
      } else {
        throw new Error();
      }
    } catch {
      return new Response(null);
    }
  },
  '/avatar/:userId': async (_, __, params) => {
    try {
      const response = await fetch(
        `https://discord.com/api/users/${params?.userId}`,
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
            'content-type': `image/png`,
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
  },
});
