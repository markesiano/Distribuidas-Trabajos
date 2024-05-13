import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:xml/xml.dart' as xml;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SOAP Client',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late final TextEditingController _controllerA;
  late final TextEditingController _controllerB;
  String _responseText = '';

  @override
  void initState() {
    super.initState();
    _controllerA = TextEditingController();
    _controllerB = TextEditingController();
  }

  @override
  void dispose() {
    _controllerA.dispose();
    _controllerB.dispose();
    super.dispose();
  }

  Future<void> _makeSoapRequest(String operation) async {
    final xmlDocument = xml.XmlDocument.parse('''
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://servicios/">
        <soapenv:Header/>
        <soapenv:Body>
          <tns:$operation>
            <a>${_controllerA.text}</a>
            <b>${_controllerB.text}</b>
          </tns:$operation>
        </soapenv:Body>
      </soapenv:Envelope>
    ''');

    final headers = {'Content-Type': 'text/xml'};

    final response = await http.post(
      Uri.parse(
          'https://web-service-java-jjj.azurewebsites.net/ws/Calculadora'),
      headers: headers,
      body: xmlDocument.toXmlString(pretty: true, indent: '\t'),
    );

    final parsedResponse = xml.XmlDocument.parse(response.body);
    final returnElement = parsedResponse.findAllElements('return').first;

    setState(() {
      _responseText = returnElement.text;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SOAP Client'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Valor A:'),
            TextField(controller: _controllerA),
            const SizedBox(height: 10),
            Text('Valor B:'),
            TextField(controller: _controllerB),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: () => _makeSoapRequest('sumar'),
              child: const Text('Sumar'),
            ),
            ElevatedButton(
              onPressed: () => _makeSoapRequest('restar'),
              child: const Text('Restar'),
            ),
            ElevatedButton(
              onPressed: () => _makeSoapRequest('multiplicar'),
              child: const Text('Multiplicar'),
            ),
            ElevatedButton(
              onPressed: () => _makeSoapRequest('dividir'),
              child: const Text('Dividir'),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: SingleChildScrollView(
                child: Text(_responseText),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
