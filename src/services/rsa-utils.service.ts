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
        debugger;
        var test = JSON.stringify({ id : 1}); 
         let random = this.randomString(16);
         const cer = Forge.pki.certificateFromPem(this.publicKey);
         const bsa = Forge.pki.publicKeyToPem(cer.publicKey);
         const publickKey =  Forge.pki.publicKeyFromPem(bsa);

        //  var buffer = new Buffer(random);
         var encrypted = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(random),
            this.publicKey,
           
         );


        //  var encrypt = window.btoa(publickKey.encrypt(random));

         var res = {
            HashKey :btoa( encrypted.toString()),
            HashData : window.btoa(this.encryptUsingAES256(test, random)),
         };
      
         console.log(res);
        return "";
    }



    encryptUsingCertificate(keyRandom: string){
         const rsa = Forge.pki.publicKeyFromPem(this.publicKey);
         let buffer = new Buffer(keyRandom);

         var encrypted = btoa(rsa.encrypt(keyRandom));
        return encrypted.toString();
    }

    encryptionAES (data : string,keyRandom: string) {
        // Encrypt
        const ciphertext = CryptoJS.AES.encrypt(data, keyRandom);
        return ciphertext.toString();
      }

      encryptUsingAES256(data : string, keyRandom: string): any {
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), keyRandom, {
            keySize: 16,
            _iv: keyRandom,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.NoPadding
        });
        return encrypted.toString();
    }






    randomString(length: number) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return (result);
    }
}