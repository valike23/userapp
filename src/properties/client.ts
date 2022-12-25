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
