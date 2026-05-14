import { afterEach, describe, expect, it } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import MessageCenterDialog from './MessageCenterDialog'
import { useRecording } from '../stores/recording'

describe('MessageCenterDialog', () => {
  afterEach(() => {
    cleanup()
    useRecording.setState({ messageCenterDialogOpen: false, messages: [] })
  })

  it('hides unread dot after mark all as read', () => {
    useRecording.setState({
      messageCenterDialogOpen: true,
      messages: [
        { id: 'm-1', title: 'T1', body: 'B1', createdAt: Date.now(), read: false },
        { id: 'm-2', title: 'T2', body: 'B2', createdAt: Date.now(), read: true },
      ],
    })

    render(<MessageCenterDialog />)

    expect(screen.getAllByLabelText('unread').length).toBe(1)

    const markAll = screen.getByLabelText('Mark All as Read')
    act(() => {
      markAll.click()
    })

    expect(useRecording.getState().messages.every((m) => m.read)).toBe(true)
    expect(screen.queryAllByLabelText('unread').length).toBe(0)
  })
})
