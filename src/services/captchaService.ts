import * as sdk from "microsoft-cognitiveservices-speech-sdk"
// This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
const speechConfig = sdk.SpeechConfig.fromSubscription(
  '8ced5b1d2f37450aa825904826a93e92',
  'brazilsouth'
);
speechConfig.speechRecognitionLanguage = "en-US";

export async function getCaptcha(strBase64: string) {
    const wavUrl = strBase64;
            const buffer = Buffer.from(wavUrl.split('base64,')[1], // only use encoded data after "base64,"
            'base64');
    // let file = Buffer.from(json)
    console.log("here")
  let audioConfig = sdk.AudioConfig.fromWavFileInput(
  buffer);
  console.log("aca")
  let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
let resultCaptcha = "hola";
await speechRecognizer.recognizeOnceAsync((result: any) => {
    const captcha =  result.text;
    resultCaptcha = captcha.replace('.','').replaceAll(' ','');
    speechRecognizer.close();
    console.log(captcha);
    
    
  });
  await sleep(3000);
  return resultCaptcha;
}

const sleep = async (milliseconds: number) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};