import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import WindowTitleBar from './WindowTitleBar'
import { useRecording } from '../stores/recording'

describe('WindowTitleBar', () => {
  afterEach(() => {
    cleanup()
    useRecording.setState({
      browserHistory: [],
      messageCenterDialogOpen: false,
      messages: [],
      authorizeDialogOpen: false,
      licenseInfoDialogOpen: false,
      licenseInfoView: { mode: 'success', email: 'Nora@gmail.com', subscription: 'lifetime' },
    })
  })

  it('sets title for window control icons only', () => {
    useRecording.setState({
      browserHistory: [],
      messageCenterDialogOpen: false,
      messages: [],
      authorizeDialogOpen: false,
      licenseInfoDialogOpen: false,
    })

    render(<WindowTitleBar />)

    const minimize = screen.getByLabelText('Minimize')
    const maximize = screen.getByLabelText('Maximize')
    const exit = screen.getByLabelText('Exit')

    expect(minimize.getAttribute('title')).toBe('Minimize')
    expect(maximize.getAttribute('title')).toBe('Maximize')
    expect(exit.getAttribute('title')).toBe('Exit')

    const messages = screen.getByLabelText('messages')
    const theme = screen.getByLabelText('theme')
    const menu = screen.getByLabelText('menu')

    expect(messages.getAttribute('title')).toBe(null)
    expect(theme.getAttribute('title')).toBe(null)
    expect(menu.getAttribute('title')).toBe(null)
  })

  it('opens message center dialog when clicking messages icon', () => {
    useRecording.setState({
      messageCenterDialogOpen: false,
      messages: [{ id: 'm-1', title: 't', body: 'b', createdAt: Date.now(), read: false }],
    })

    render(<WindowTitleBar />)

    const btn = screen.getByLabelText('messages')
    expect(screen.getByText('1')).toBeTruthy()

    btn.click()

    expect(useRecording.getState().messageCenterDialogOpen).toBe(true)
  })
})

