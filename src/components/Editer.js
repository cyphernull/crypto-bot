import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeMethod } from '../actions/methods'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import CryptoJS from 'crypto-js'
class Editer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plainText: '',
      cipherText: '',
      bitsValue: 384,
      passphrase: '',
      keySize: 512,
      salt: '',
      literation: 1000,
      subtitle: 'MD5'
    }
  }
  componentDidMount() {
    if (localStorage.getItem('method') !== null) {
      this.props.dispatch(changeMethod(localStorage.getItem('method')))
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      subtitle: this.getSubtitle(nextProps.method)
    })
  }
  handlePlainChange = e => {
    const plainText = e.target.value
    this.setState({
      plainText
    })
  }
  handleCipherChange = e => {
    const cipherText = e.target.value
    this.setState({
      cipherText
    })
  }
  handlePassphraseChange = e => {
    const passphrase = e.target.value
    this.setState({
      passphrase
    })
  }
  handleSaltChange = e => {
    const salt = e.target.value
    this.setState({
      salt
    })
  }
  handleLiterationChange = e => {
    const literation = e.target.value
    this.setState({
      literation
    })
  }
  handleEncrypt = () => {
    if (this.props.method === 'SHA3') {
      const output = {
        outputLength: this.state.bitsValue
      }
      const cipherText = CryptoJS.SHA3(this.state.plainText, output).toString()
      this.setState({
        cipherText
      })
    } else if (this.props.method.indexOf('Hmac') > -1) {
      const cipherText = CryptoJS[this.props.method](this.state.plainText, this.state.passphrase).toString()
      this.setState({
        cipherText
      })
    } else if (this.props.method.indexOf('EvpKDF') > -1 || this.props.method.indexOf('PBKDF2') > -1) {
      const cfg = {
        keySize: this.state.keySize / 32,
        iterations: this.state.literation
      }
      const cipherText = CryptoJS[this.props.method](this.state.plainText, this.state.salt, cfg).toString()
      this.setState({
        cipherText
      })
    } else if (
      this.props.method.indexOf('AES') > -1 ||
      this.props.method.indexOf('DES') > -1 ||
      this.props.method.indexOf('RC4') > -1 ||
      this.props.method.indexOf('Rabbit') > -1
    ) {
      const key = this.state.passphrase
      const cipherText = CryptoJS[this.props.method]
        .encrypt(this.state.plainText, key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        })
        .toString()
      this.setState({
        cipherText
      })
    } else {
      const cipherText = CryptoJS[this.props.method](this.state.plainText).toString()
      this.setState({
        cipherText
      })
    }
  }
  getSubtitle = method => {
    if (method.indexOf('Hmac') > -1) {
      return 'Hash-based Message Authentication Code'
    }
    switch (method) {
      case 'MD5':
        return 'Message Digest Algorithm 5'
      case 'SHA1':
        return 'Secure Hash Algorithm 1'
      case 'SHA3':
        return 'Secure Hash Algorithm ( Keccak[c=2d] )'
      case 'SHA224':
        return 'Secure Hash Algorithm 224'
      case 'SHA256':
        return 'Secure Hash Algorithm 256'
      case 'SHA384':
        return 'Secure Hash Algorithm 384'
      case 'SHA512':
        return 'Secure Hash Algorithm 512'
      default:
        return 'Encrytion'
    }
  }
  handleBitsChange = (e, k, p) => {
    this.setState({
      bitsValue: p
    })
  }
  handlekeySizeChange = (e, k, p) => {
    this.setState({
      keySize: p
    })
  }
  determineDecryptable = () => {
    if (
      this.props.method.indexOf('AES') > -1 ||
      this.props.method.indexOf('DES') > -1 ||
      this.props.method.indexOf('RC4') > -1 ||
      this.props.method.indexOf('Rabbit') > -1
    ) {
      return false
    } else {
      return true
    }
  }
  handleDecrypt = () => {
    const cipher = this.state.cipherText
    const key = this.state.passphrase
    const plainText = CryptoJS[this.props.method]
      .decrypt(cipher, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      .toString(CryptoJS.enc.Utf8)
    this.setState({
      plainText
    })
  }
  render() {
    return (
      <div className="editer">
        <Card>
          <CardHeader title={this.props.method} subtitle={this.state.subtitle} />
          <CardActions>
            <TextField
              fullWidth={true}
              className="text-input"
              hintText="输入"
              floatingLabelText="明文"
              onChange={this.handlePlainChange}
              value={this.state.plainText}
            />
            {this.props.method === 'SHA3' ? (
              <SelectField value={this.state.bitsValue} onChange={this.handleBitsChange} floatingLabelText="bits">
                <MenuItem value={512} primaryText="512" />
                <MenuItem value={384} primaryText="384" />
                <MenuItem value={256} primaryText="256" />
                <MenuItem value={224} primaryText="224" />
              </SelectField>
            ) : null}
            {this.props.method.indexOf('Hmac') > -1 ||
            this.props.method.indexOf('AES') > -1 ||
            this.props.method.indexOf('DES') > -1 ||
            this.props.method.indexOf('RC4') > -1 ||
            this.props.method.indexOf('Rabbit') > -1 ? (
              <TextField
                fullWidth={true}
                className="text-input"
                hintText="输入"
                floatingLabelText="密钥"
                onChange={this.handlePassphraseChange}
                value={this.state.passphrase}
              />
            ) : null}
            {this.props.method.indexOf('EvpKDF') > -1 || this.props.method.indexOf('PBKDF2') > -1 ? (
              <div>
                <TextField
                  fullWidth={true}
                  className="text-input"
                  hintText="输入"
                  floatingLabelText="盐"
                  onChange={this.handleSaltChange}
                  value={this.state.salt}
                />
                <SelectField value={this.state.keySize} onChange={this.handlekeySizeChange} floatingLabelText="bits">
                  <MenuItem value={512} primaryText="512" />
                  <MenuItem value={256} primaryText="256" />
                  <MenuItem value={128} primaryText="128" />
                </SelectField>
                <TextField
                  fullWidth={true}
                  className="text-input"
                  hintText="1000"
                  floatingLabelText="迭代"
                  onChange={this.handleLiterationChange}
                  value={this.state.literation}
                  type="number"
                />
              </div>
            ) : null}
            <TextField
              fullWidth={true}
              className="text-input text-input-down"
              hintText="输入"
              floatingLabelText="密文"
              onChange={this.handleCipherChange}
              value={this.state.cipherText}
              multiLine={true}
            />
          </CardActions>
          <CardActions className="editer-buttons">
            <RaisedButton label="加 密" primary={true} onClick={this.handleEncrypt} />
            <RaisedButton
              label="解 密"
              secondary={true}
              onClick={this.handleDecrypt}
              disabled={this.determineDecryptable()}
            />
          </CardActions>
        </Card>
      </div>
    )
  }
}
const mapSateToProps = (state, props) => {
  return {
    method: state.method
  }
}
export default connect(mapSateToProps)(Editer)
