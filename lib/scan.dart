import 'query.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:date_time_format/date_time_format.dart';

scan_in() async {
  String scanResult = await FlutterBarcodeScanner.scanBarcode('#000000', 'cancel', false, ScanMode.BARCODE);
  var time = DateTime.now().format(TimeFormats.standard);
  var date = DateTime.now().format(DateTimeFormats.commonLogFormat).substring(0,11);
  var status = "IN";
  if(scanResult != null){
    insert(scanResult, date, time, status);
    print(scanResult);
    print(time);

  }
}


scan_out() async {
  String scanResult = await FlutterBarcodeScanner.scanBarcode('#000000', 'cancel', false, ScanMode.BARCODE);
  var time = DateTime.now().format(TimeFormats.standard);
  var date = DateTime.now().format(DateTimeFormats.commonLogFormat).substring(0,11);
  var status = "OUT";
  if(scanResult != null){
    insert(scanResult, date, time, status);
    print(scanResult);
    print(time);

  }
}