import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import SettingDialog from './SettingDialog'
import { useRecording } from '../stores/recording'

describe('SettingDialog', () => {
  afterEach(() => {
    cleanup()
    useRecording.setState({
      settingDialogOpen: false,
      settingActivePage: 'proxy',
      proxyProtocol: 'HTTP',
      proxyHost: '',
      proxyPort: '',
      proxyUsername: '',
      proxyPassword: '',
    })
  })

  it('renders shell sizing when open', () => {
    useRecording.setState({ settingDialogOpen: true })
    render(<SettingDialog />)

    const dialog = screen.getByRole('dialog', { name: 'Setting' })
    expect(dialog.className).toContain('w-[868px]')
    expect(dialog.className).toContain('h-[634px]')

    expect(screen.getByText('OK')).toBeTruthy()
    expect(screen.getByText('Cancel')).toBeTruthy()
  })

  it('renders proxy fields by default', () => {
    useRecording.setState({ settingDialogOpen: true, settingActivePage: 'proxy' })
    render(<SettingDialog />)

    expect(screen.getByText('Proxy Protocol')).toBeTruthy()
    expect(screen.getByText('Host')).toBeTruthy()
    expect(screen.getByText('Port')).toBeTruthy()
    expect(screen.getByText('Username')).toBeTruthy()
    expect(screen.getByText('Password')).toBeTruthy()
  })
})

