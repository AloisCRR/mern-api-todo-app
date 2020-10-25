import {
  AzureKeyCredential,
  TextAnalyticsClient,
} from "@azure/ai-text-analytics";

export default new TextAnalyticsClient(
  process.env.AZURE_ENDPOINT as string,
  new AzureKeyCredential(process.env.AZURE_ENDPOINT_API_KEY as string)
);
