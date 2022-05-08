#include <ArduinoJson.h>

#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char *ssid = "AriWiFi"; // red wifi 2.4GHZ
const char *password = "holamundo1357.";

const char *mqttServer = "broker.emqx.io";
const int mqttPort = 1883;
const char *mqttUser = "mqttusername_fire";
const char *mqttPassword = "manzanita1512_0$";
const char *mqttChannel = "devices";

#define DEVICE_ID "52331ed5-ffa4-4565-b181-62451fd02dd5"
#define SUB_CHANNEL DEVICE_ID
#define PUB_CHANNEL "/fire-detector"

int sendData = 0;
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

DynamicJsonDocument doc(1024);
char buffer[256];

void PubSubCallback(char *topic, byte *payload, unsigned int length)
{

  StaticJsonDocument<256> doc;
  // {ack : true}
  deserializeJson(doc, payload);
  const int statusProp = doc["ack"];

  Serial.print(" ***** Config recibida ***** --> ");
  Serial.println(statusProp);
}

void initWifiStation()
{
  Serial.println("Connectinf wifi");
  WiFi.mode(WIFI_AP_STA);
  WiFi.begin(ssid, password);
  Serial.print("\nConnecting to WiFi");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.print(".");
  }
  Serial.println(String("\nConnected to the WiFi network (") + ssid + ")");
}

void initMQTTClient()
{

  mqttClient.setServer(mqttServer, mqttPort);
  mqttClient.setCallback(PubSubCallback);

  while (!mqttClient.connected())
  {
    Serial.println(String("Connecting to MQTT (") + mqttServer + ")...");
    if (mqttClient.connect(mqttChannel, mqttUser, mqttPassword))
    {
      Serial.println("MQTT client connected");
    }
    else
    {
      Serial.print("\nFailed with state ");
      Serial.println(mqttClient.state());

      if (WiFi.status() != WL_CONNECTED)
      {
        initWifiStation();
      }
      delay(2000);
    }
  }

  mqttClient.subscribe(SUB_CHANNEL);
}

void setup()
{

  Serial.begin(115200);
  initWifiStation();
  initMQTTClient();
}

void loop()
{
  Serial.println(analogRead(A0));
      mqttClient.loop();
  // si el read del sensor es mayor a 300 (0 - 1023)
  if (sendData == 0)
  {
    mqttClient.publish(PUB_CHANNEL, buffer);
    sendData = 1;
  }
  delay(500);
}
