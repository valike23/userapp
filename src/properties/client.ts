import axios from "axios";


export function getOS (){
    let nav = navigator.userAgent;
    console.log(nav);
    let first = nav.indexOf('(') + 1;
    let last = nav.indexOf(';');
    const strAry = nav.split('');
    const str = strAry.splice(first, last -first);
   const finalStr = str.join('');
    return(finalStr)
}
export enum Eos {
    ANDRIOD = 'android',
    WINDOWS = 'windows',
    IOS = 'iOS',
    MAC = 'machintosh',
    NONE = 'none'
}

export const tokenManagement = ()=>{

}

export function osName (): Eos{
   const os = getOS();
   if(os == 'Linux') return Eos.ANDRIOD;
   if(os == 'Macintosh') return Eos.MAC;
   if(os == 'iPhone') return Eos.IOS;
   if(os.includes('Window')) return Eos.WINDOWS;
   return Eos.NONE

}
export const handleNotification = (message: string, win: any, type: string, title: string,
     image: string = '', func: any = () => { }) => {
    console.log(type);
    win.iziToast[type]({
        title,
        message,
        position: 'topRight',
        image,
        onClosed: func
    })

    return func || 0
}

export const calculateTimeRemaining =(created: any, duration: number)=>{
  try {
    const currentTime: any = new Date();
    const createdDate: any = new Date(created);
    console.log(currentTime, created);
    let timeTaken = currentTime - createdDate;
    const finalDuration = duration * 1000 * 60 * 60 * 24 * 30;
    timeTaken = finalDuration - timeTaken;
    timeTaken = Math.ceil(timeTaken / (1000 * 60 * 60 * 24)) ;
    console.log(timeTaken);
    return timeTaken;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function generateToken (win: any) {
  try {
    const firebaseConfig = {
      apiKey: "AIzaSyAY6mR0fb0gpj7HnP_DmTuIXGav05FJcak",
      authDomain: "safesave-c6946.firebaseapp.com",
      projectId: "safesave-c6946",
      storageBucket: "safesave-c6946.appspot.com",
      messagingSenderId: "810751581589",
      appId: "1:810751581589:web:7f6af7a94ece2466da6a9c",
      measurementId: "G-LZMK2J6NCF"
    };
    
    const app = win.firebase.initializeApp(firebaseConfig);
    console.log('mesaging:',win.messaging);
    console.log(win.firebase.messaging().firebaseDependencies);
   // const messaging =  win.firebase.messaging().installations.app.getMessaging(app);
    const resp = await  win.firebase.messaging().firebaseDependencies.installations.getToken({
        vapidKey: 'BAEhTqvl9AkamjtTmqb79u5obgUT1lgDF0E08QZZC2U16ZzVr3RTxEJyuJnHVGCN8cpZkoy6FnJ8hZdWBwBnCfM'
      });

      console.log(resp);
      return resp;
      //handleNotification('it is working', window, 'success', 'success');
  } catch (error) {
    console.log(error);
    handleNotification('token failed to generate', window, 'error','error');
  }
}

export async function uploadToken(token: string) {
  try {
    const resp = await axios.post('api/accounts/token', {token});
    if(resp.data) return handleNotification('token uploaded successfully', window, 'success', 'success');

  } catch (error) {
    handleNotification('token upload failed', window,'error','error');
  }
}

export async function setToken(){
  
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
})
}
