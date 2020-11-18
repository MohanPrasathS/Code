import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'scan.dart';
import 'package:date_time_format/date_time_format.dart';
import 'query.dart';

void main() {
  runApp(MaterialApp(
    home: Launcher(),
  ),
  );
}
class Launcher extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Home();
  }
}

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title : Text("Tracker!"),
        centerTitle : true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            RaisedButton.icon(
              onPressed: () async {
                scan_in();
              },
              icon: Icon(
                Icons.qr_code_scanner,
              ),
              label: Text("Scan IN!"),
              color: Colors.orange[400],
            ),
            RaisedButton.icon(
              onPressed: () async {
                scan_out();
              },
              icon: Icon(
                Icons.qr_code_scanner,
              ),
              label: Text("Scan OUT!"),
              color: Colors.orange[400],
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: Text("Scan!"),
        onPressed: () async {
          var scanResult = "17CSE28";
          var time = DateTime.now().format(TimeFormats.standard);
          var date = DateTime.now().format(DateTimeFormats.commonLogFormat).substring(0,11);
          var status = "IN";

          insert(scanResult, date, time, status);
            print(scanResult);
            print(time);
        },
      ),
    );
  }
}