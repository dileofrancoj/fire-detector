import mqtt from "mqtt";
import { logger } from "../utils/logger";
import { send } from "./sendEmail";

import {
  PORT as port,
  CLIENT_ID as clientId,
  HOST as host,
  USERNAME_MQTT as username,
  PASSWORD_MQTT as password,
} from "../utils/mqtt";

const options = {
  port,
  host,
  clientId,
  username,
  password,
  clean: true,
  encoding: "utf8",
};

const connectEvent = () => {
  client.subscribe("/fire-detector", (err) => {
    logger.info("Connected to /fire-detector");
    if (err) new Error();
  });
};

const sendMessage = ({ payload, uuid_device }) => {
  client.publish(uuid_device, JSON.stringify(payload));
};

const messageEvent = async (topic, message) => {
  try {
    await send();
    sendMessage({ payload: { message: "hello" }, uuid_device: "52331ed5-ffa4-4565-b181-62451fd02dd5" });
  } catch (e) {
    throw e;
  }
};

const client = mqtt.connect(host, options);

client.on("connect", connectEvent);
client.on("message", messageEvent);

// document.addEventListener('click', pindonga)
