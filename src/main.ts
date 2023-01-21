import { assert, deserialize } from "@deepkit/type";
import Log from "@uk/log";
import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { Config } from "./config";

const log = new Log("MAIN");

log.try("Start", async () => {
    dotenv.config();
    const config = deserialize<Config>(process.env);
    assert<Config>(config);

    log.info("Config", config);

    const bot = new Telegraf(config.TG_TOKEN, {
        handlerTimeout: config.TG_TIMEOUT,
    });

    bot.use(async (ctx, next) => {
        try {
            log.debug("incoming", ctx.update);
            await ctx.reply(config.REPLY);
        } catch (err) {
            log.error(err);
        }
        return next && next();
    });

    await bot.launch();
});
