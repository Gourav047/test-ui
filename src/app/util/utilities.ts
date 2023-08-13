import Swal from "sweetalert2"

export function tosterFunction(type:string,message:string){
    const Toast:any = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: type,
        title: message
      })
}

export function stringToBase64(inputString: string): string {
  const utf8Encoder = new TextEncoder();
  const data = utf8Encoder.encode(inputString);
  return btoa(String.fromCharCode(...data));
}

export function base64ToString(base64String: string): string {
  const binaryString = atob(base64String);
  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  const utf8Decoder = new TextDecoder();
  return utf8Decoder.decode(uint8Array);
}

export function convertBase64ToImageUrl(base64String: string): string {
  const dataPart = base64String.split(',')[1];
  const binaryData = atob(dataPart);
  const uint8Array = new Uint8Array(binaryData.length);

  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: 'image/png' });
  return URL.createObjectURL(blob);
}