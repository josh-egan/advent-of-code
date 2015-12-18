function _isNumber(text) {
  return /^\d+$/g.test(text)
}

class Circuit {

  wires = {}

  constructor(instructions) {
    instructions.forEach(i => this._connectWire(i))
  }

  _connectWire(instruction) {
    let parts = instruction.split('->')

    let gate = this._getGate(parts[0].trim())
    let downstreamWireName = parts[1].trim()

    this._assertWire(downstreamWireName)
    this.wires[downstreamWireName].connectUpstreamGate(gate)
  }

  _getGate(upstream) {
    if (/AND/.test(upstream)) return this._get2InputGate(upstream, 'AND', AndGate)
    else if (/OR/.test(upstream)) return this._get2InputGate(upstream, 'OR', OrGate)
    else if (/LSHIFT/.test(upstream)) return this._get2InputGate(upstream, 'LSHIFT', LeftShiftGate)
    else if (/RSHIFT/.test(upstream)) return this._get2InputGate(upstream, 'RSHIFT', RightShiftGate)
    else if (/NOT/.test(upstream)) return this._getNotGate(upstream)
    else return this._parseInput(upstream)
  }

  _get2InputGate(upstream, gateKey, gateConstructor) {
    let gateInputs = upstream.split(gateKey)
    let leftInput = this._parseInput(gateInputs[0].trim())
    let rightInput = this._parseInput(gateInputs[1].trim())
    return new gateConstructor(leftInput, rightInput)
  }

  _getNotGate(upstream) {
    let inputText = upstream.replace('NOT', '').trim()
    return new NotGate(this._parseInput(inputText))
  }

  _parseInput(text) {
    if (_isNumber(text))
      return new ConstantValueGate(text)
    else {
      this._assertWire(text)
      return this.wires[text]
    }
  }

  _assertWire(wireName) {
    if (this.wires[wireName] === undefined)
      this.wires[wireName] = new Wire(wireName)
  }

  getSignal(wireName) {
    if (this.wires[wireName] === undefined)
      throw new Error(`wire '${wireName}' has not been defined`)

    return this.wires[wireName].getValue()
  }
}

class Wire {
  constructor(wireName) {
    this.id = wireName
  }

  connectUpstreamGate(gate) {
    this.upstreamGate = gate
  }

  getValue() {
    if (this.upstreamGate === undefined)
      throw new Error(`wire '${this.id}' does not have an input`)

    if (this.value === undefined)
      this.value = this.upstreamGate.getValue()

    return this.value
  }
}

class TwoInputGate {
  constructor(leftInput, rightInput) {
    this.leftInput = leftInput
    this.rightInput = rightInput
  }
}

class AndGate extends TwoInputGate {
  constructor() { super(...arguments) }

  getValue() {
    return this.leftInput.getValue() & this.rightInput.getValue()
  }
}


class OrGate extends TwoInputGate {
  constructor() { super(...arguments) }

  getValue() {
    return this.leftInput.getValue() | this.rightInput.getValue()
  }
}

class LeftShiftGate extends TwoInputGate {
  constructor() { super(...arguments) }

  getValue() {
    return this.leftInput.getValue() << this.rightInput.getValue()
  }
}

class RightShiftGate extends TwoInputGate {
  constructor() { super(...arguments) }

  getValue() {
    return this.leftInput.getValue() >> this.rightInput.getValue()
  }
}

class NotGate {
  constructor(input) {
    this.input = input
  }

  getValue() {
    return (~ this.input.getValue()) & 65535
  }
}

class ConstantValueGate {
  constructor(val) {
    this.value = Number.parseInt(val)
  }

  getValue() {
    return this.value
  }
}

export default Circuit
