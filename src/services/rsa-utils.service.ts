import { environment } from './../environments/environment';
import { Injectable, OnInit, inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as Forge from 'node-forge';

@Injectable({
    providedIn: 'root',
})
export class RSAService implements OnInit {
    public publicKey: string = `-----BEGIN CERTIFICATE-----
    MIIDfDCCAmSgAwIBAgIUNHJlkcdwZ2OXkNLw3geHGv06Uh0wDQYJKoZIhvcNAQEL
    BQAwPTELMAkGA1UEBhMCVk4xDDAKBgNVBAgMA0hDTTELMAkGA1UEBwwCUTIxEzAR
    BgNVBAoMCnRoYW5oIHR1YW4wHhcNMjMwNzI1MDIxODQzWhcNMjQwNzI0MDIxODQz
    WjA9MQswCQYDVQQGEwJWTjEMMAoGA1UECAwDSENNMQswCQYDVQQHDAJRMjETMBEG
    A1UECgwKdGhhbmggdHVhbjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
    ALhi3PTv1bPvK2ozCV5+d/zQ0jvKR/8QwiBWwqsZyAMezPEiCpH0wSygYXjjhz1e
    MvvkKFDQLbdNW9GZMAZ29iZ/xROHtEYUqDGp7yLF4PlBkM4JljooOQwxwUrxCJIm
    SZi7FFrqezZ71/dFGFiXjw+Pzdgy6tr5YGOudw5YyFDGipUbveYzeYHPBsaMJUEp
    n6QYoNyjZQ+ad0M4uGAKGjNW1/zXRtNpbBWe4tD9NIvPU0Lfis+bkN3D1b+Z6ZQn
    uk3kWEYh+ixUDwLaS07rm5zZIM5WC6IZVF+KkwVglx4WkgGEKC7SgRYJ/7mcuEBp
    jjH67jwTMEo5MPZHbsCpvSsCAwEAAaN0MHIwHQYDVR0OBBYEFNjltQcNBimJFHzB
    A96l8fiKf51NMB8GA1UdIwQYMBaAFNjltQcNBimJFHzBA96l8fiKf51NMA4GA1Ud
    DwEB/wQEAwIFoDAgBgNVHSUBAf8EFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDQYJ
    KoZIhvcNAQELBQADggEBAJyZhQvz1sQoZnGKdKLsMvM9jPNPLGNM5vVvC8RIntBm
    ZsBPKMsZr2fgiPyDOFY9y6b8LQulebwim2mD4nd1tgXEUZcdqha26KWtgwNCdXYs
    M3LygkzGGj9mXrgMU57tbJreI57hngKeSDAquNPNLplKHtdbqJdh5H4OgZTK2F9E
    m9Fv3AFBFEeXB26e52AcGh166KwovGiRlQrPix40UHlzzgeuqBpUcRMqAm5Vp0FW
    gg5aMokwwDKZmOaN/yIihT/+r+jVxHt4GMTDJpgdAI7BNPOC5YITir1HzeRtrlm3
    bNnWx/g77NGs6sdmprzAf8DUoPE/E8F5aetltaP7gNg=
    -----END CERTIFICATE-----`;

    constructor() {
    }

    ngOnInit(): void {
    }

    encrypt(valueToEncrypt: string): string {
        var test = JSON.stringify({ id: 1 });
        let random = this.randomString(16);
        console.log(random)

        var res = {
            HashKey: this.encryptUsingCertificate(random),
            HashData: this.encryptUsingAES(test, random),
        };
        var res2 = {
            HashKey: this.encryptUsingCertificate(random),
            HashData: btoa( this.encryptUsingAES(test, random)),
        };
        console.log("res1 " );

        console.log(res);

        console.log("res2 " );

        console.log(res2);
        return "";
    }

    encryptUsingCertificate(keyRandom: string) {
        const cer = Forge.pki.certificateFromPem(this.publicKey);
        const bsa = Forge.pki.publicKeyToPem(cer.publicKey);
        const publickKey = Forge.pki.publicKeyFromPem(bsa);
        var encrypted = publickKey.encrypt(Forge.util.encodeUtf8(keyRandom), 'RSA-OAEP');
        return btoa(encrypted.toString());
    }

    encryptUsingAES(data: string, keyRandom: string): any {


        
      // var cipher = CryptoJS.

        var encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Base64.parse(keyRandom) , {
             keySize: 16,
             iv: CryptoJS.enc.Base64.parse(keyRandom),
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
         });
        
//   var aa = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

//          return aa;

         return CryptoJS.enc.Base64.parse( encrypted.toString()).toString();


      // var rawData = btoa(data);
        //var iv = btoa(keyRandom);
        //var crypttext = btoa(rawData.substring(16));

        // Decrypt...
        // var plaintextArray = CryptoJS.AES.decrypt(
        //     {
        //         ciphertext: CryptoJS.enc.Base64.parse(crypttext),
        //         salt: ''
        //     },
        //     CryptoJS.enc.Hex.parse(keyRandom),
        //     { iv: CryptoJS.enc.Base64.parse(iv) }
        // );
        //return aaa.toString();
 // Forge.util.encodeUtf8(keyRandom)
 debugger;
 let data2 = Forge.util.encodeUtf8(data);
    let _iv2 = CryptoJS.enc.Utf8.parse(keyRandom);

    let _iv =  CryptoJS.enc.Base64.parse(Forge.util.encodeUtf8(keyRandom));
        //var key  = Forge.util.encodeUtf8(keyRandom);
        var encrypted = CryptoJS.AES.encrypt(data2, _iv2, {
           // keySize: 128/8,
            iv: _iv2,
            mode: CryptoJS.mode.CBC,
            //padding: CryptoJS.pad.NoPadding
        });
        return  encrypted.toString();
    }

    randomString(length: number) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return (result);
    }
}