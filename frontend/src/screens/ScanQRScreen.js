import React, { useState, useRef } from 'react';
import {Container, Card, CardContent, makeStyles, Grid, Button, TextField} from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';

function App() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const qrRef = useRef(null);
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');

  const classes = styles();

  const genQRcode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch(err) {
      console.log(err);
    }
  };

  const handleErrorWebCam = (err) => {
    console.log(err);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  const handleErrorFile = (err) => {
    console.log(err);
  };

  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };

  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>General Download and Scan QR Code</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField label="Enter text here" onChange={(e) => setText(e.target.value)}></TextField>
              <Button variant="contained" color="primary" className={classes.btn} onClick={() => genQRcode()}>General</Button>
              <br />
              <a href={imageUrl} download>
                <img src={imageUrl} alt='img'/>
              </a>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button variant="contained" color="secondary" className={classes.btn} onClick={onScanFile}>Scan QR</Button>
              <QrReader ref={qrRef} delay={300} style={{width: "100%"}} onError={handleErrorFile} onScan={handleScanFile} legacyMode></QrReader>
              <h2>{scanResultFile}</h2>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <QrReader delay={300} style={{width: "100%"}} onError={handleErrorWebCam} onScan={handleScanWebCam}></QrReader>
              <h2>{scanResultWebCam}</h2>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}></Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const styles = makeStyles((theme) => ({
  container: {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#234aa4',
    color: '#fff',
    padding: 20
  },
  btn: {
    marginTop: 10,
    marginBottom: 20
  }
}));

export default App;
