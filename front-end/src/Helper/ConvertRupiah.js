function ConvertRupiah(angka) {
    let convert = angka.toString().split("").reverse().join("");
    let rp = convert.match(/\d{1,3}/g);
    rp = rp.join(".").split("").reverse().join("");
    return `Rp ${rp}`;
  }
  
  module.exports = { ConvertRupiah };