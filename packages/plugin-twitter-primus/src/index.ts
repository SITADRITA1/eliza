import { Plugin } from "@elizaos/core";
import { postAction } from "./actions/post";
import {tweetProvider} from "./provider/tweetProvider.ts";

export const twitterPlugin: Plugin = {
    name: "twitter",
    description: "Twitter integration plugin for posting tweets with proof generated by primus",
    actions: [postAction],
    evaluators: [],
    providers: [],
};

export default twitterPlugin;
