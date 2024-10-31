import { Icon28DeleteOutline } from '@vkontakte/icons'
import { Popover, CellButton, Button } from '@vkontakte/vkui'

interface SettingsPopoverProps {
  id: number
  changeFunction: (id: number) => void
  deleteFunction: (id: number) => void
}

const SettingsPopover = ({
  id,
  changeFunction,
  deleteFunction,
}: SettingsPopoverProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
        borderRadius: 8,
      }}
    >
      <Popover
        trigger="click"
        id="menupopup"
        role="dialog"
        aria-labelledby="menubutton"
        content={({ onClose }) => (
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 8,
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <CellButton
              role="menuitem"
              before={<img src="/images/change.svg" />}
              onClick={() => {
                changeFunction(id)
                onClose()
              }}
            >
              Изменить
            </CellButton>
            <CellButton
              role="menuitem"
              before={<Icon28DeleteOutline />}
              mode="danger"
              onClick={() => {
                deleteFunction(id)
                onClose()
              }}
            >
              Удалить
            </CellButton>
          </div>
        )}
      >
        <Button
          size="m"
          appearance="accent"
          mode="outline"
          before={<img src="/images/settings.svg" alt="" />}
          id="menubutton"
          style={{ backgroundColor: '#ffffff' }}
          aria-controls="menupopup"
        />
      </Popover>
    </div>
  )
}

export default SettingsPopover
