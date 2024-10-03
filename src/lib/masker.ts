/* eslint-disable @typescript-eslint/no-explicit-any */
import IMask from 'imask'

export const masker = ({
  masked,
  transform,
  maskDefault,
}: {
  masked: any
  transform?: any
  maskDefault?: any
}) =>
  (function () {
    const mask = IMask.createPipe(
      masked,
      IMask.PIPE_TYPE.UNMASKED,
      IMask.PIPE_TYPE.MASKED
    )

    const unmask = IMask.createPipe(
      masked,
      IMask.PIPE_TYPE.MASKED,
      IMask.PIPE_TYPE.UNMASKED
    )

    const onChange = (e: any) => {
      const unmasked = unmask(e.target.value)
      const newValue = mask(unmasked)
      e.target.value = newValue
      return e
    }

    return {
      mask,
      onChange,
      transform,
      unmask,
      maskDefault,
    }
  })()

export const telMask = masker({
  masked: {
    mask: '(00) 00000-0000',
  },
})

export const emailMask = masker({
  masked: {
    mask: /^\S*@?\S*$/,
  },
})

export const zipCodeMask = masker({
  masked: {
    mask: '00000-000',
  },
})

export const dateMaskMMYY = masker({
  masked: {
    mask: '00/00',
  },
})

export const decimalMask = masker({
  masked: {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
    mapToRadix: ['.'],
    autofix: true,
  },
})
