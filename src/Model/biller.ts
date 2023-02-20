export enum Ebiller  {
    AIRTIME_MTN = 'BIL099',
    AIRTIME_AIRTEL = 'BIL100',
    AIRTIME_GLO = 'BIL102',
    AIRTIME_9MOBILE = 'BIL103',
    MTN_DATA = 'BIL104',
    AIRTEL_DATA = 'BIL106',
    GLO_DATA = 'BIL105',
    DATA_9MOBILE = 'BIL107'

}
export const billerInfo = [
 {
        logo: 'https://seeklogo.com/images/A/airtel-logo-AEFF942276-seeklogo.com.png',
        name: 'airtel',
        dataBiller: Ebiller.AIRTEL_DATA,
        airtimeBiller: Ebiller.AIRTIME_AIRTEL
    },
 {
        logo: 'https://seeklogo.com/images/M/mtn-logo-40644FC8B0-seeklogo.com.png',
        name: 'mtn',
        dataBiller: Ebiller.MTN_DATA,
        airtimeBiller: Ebiller.AIRTIME_MTN
    },
    {
        logo: 'https://img.icons8.com/fluency/512/glo.png',
        name: 'glo',
        dataBiller: Ebiller.GLO_DATA,
        airtimeBiller: Ebiller.AIRTIME_GLO
    },
     {
        logo: 'https://static-00.iconduck.com/assets.00/9mobile-icon-295x512-n7s4ssgv.png',
        name: '9mobile',
        dataBiller: Ebiller.DATA_9MOBILE,
        airtimeBiller: Ebiller.AIRTIME_9MOBILE
    }
]