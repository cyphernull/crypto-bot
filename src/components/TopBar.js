import React, { Component } from 'react'
import { changeMethod } from '../actions/methods'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  componentDidUpdate() {
    console.log(this.props.method)
  }
  handleClickLeft = () => {
    this.setState({
      open: true
    })
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }
  handleClickItem = (e, m) => {
    const cryptoMethod = m.props.children
    this.props.dispatch(changeMethod(cryptoMethod))
  }
  render() {
    return (
      <div>
        <Drawer docked={false} width={240} open={this.state.open} onRequestChange={open => this.setState({ open })}>
          <Menu onItemClick={this.handleClickItem}>
            <MenuItem disabled={true}>
              <a style={{ fontWeight: 'bold' }}>选择加密方式</a>
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'MD5' === this.props.method}>
              MD5
            </MenuItem>

            <MenuItem onClick={this.handleClose} checked={'RIPEMD160' === this.props.method}>
              RIPEMD160
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'SHA1' === this.props.method}>
              SHA1
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'SHA3' === this.props.method}>
              SHA3
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'SHA224' === this.props.method}>
              SHA224
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'SHA256' === this.props.method}>
              SHA256
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'SHA384' === this.props.method}>
              SHA384
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'SHA512' === this.props.method}>
              SHA512
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'HmacMD5' === this.props.method}>
              HmacMD5
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'HmacRIPEMD160' === this.props.method}>
              HmacRIPEMD160
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'HmacSHA1' === this.props.method}>
              HmacSHA1
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'HmacSHA3' === this.props.method}>
              HmacSHA3
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'HmacSHA224' === this.props.method}>
              HmacSHA224
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'HmacSHA256' === this.props.method}>
              HmacSHA256
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'HmacSHA384' === this.props.method}>
              HmacSHA384
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'HmacSHA512' === this.props.method}>
              HmacSHA512
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'EvpKDF' === this.props.method}>
              EvpKDF
            </MenuItem>
            <MenuItem onClick={this.handleClose} checked={'PBKDF2' === this.props.method}>
              PBKDF2
            </MenuItem>
          </Menu>
        </Drawer>
        <AppBar
          title="Crypto-Bot"
          onLeftIconButtonClick={this.handleClickLeft}
          showMenuIconButton={true}
          className="topbar"
        />
      </div>
    )
  }
}
const mapSateToProps = (state, props) => {
  return {
    method: state.method
  }
}
export default connect(mapSateToProps)(TopBar)
