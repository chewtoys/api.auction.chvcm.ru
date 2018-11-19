import {EmailNotifications, Jwt, ResponseChain} from "src";

export default function signUser(chain: ResponseChain) {
  chain
    .json(async (context) => {
      return {
        tfa: context.chain.req.user.tfa,
        token: await Jwt.signUser({
          id: context.chain.req.user.id as string,
          type: context.chain.req.user.type as string,
        }),
      };
    })
    .action(async (context) => {
      await EmailNotifications.instance.signin(context.chain.req.user);
    });
}
