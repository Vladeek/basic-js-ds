const { Node } = require('../extensions/list-tree.js')
class BinarySearchTree {
	constructor() {
		this.rootNode = null
	}

	root() {
		return this.rootNode
	}

	add(data) {
		const newNode = new Node(data)
		if (this.rootNode === null) {
			this.rootNode = newNode
		} else {
			this._addNode(this.rootNode, newNode)
		}
	}

	_addNode(node, newNode) {
		if (newNode.data < node.data) {
			if (node.left === null) {
				node.left = newNode
			} else {
				this._addNode(node.left, newNode)
			}
		} else {
			if (node.right === null) {
				node.right = newNode
			} else {
				this._addNode(node.right, newNode)
			}
		}
	}

	has(data) {
		return this._hasNode(this.rootNode, data)
	}

	_hasNode(node, data) {
		if (node === null) {
			return false
		}
		if (data === node.data) {
			return true
		}
		return data < node.data
			? this._hasNode(node.left, data)
			: this._hasNode(node.right, data)
	}

	find(data) {
		return this._findNode(this.rootNode, data)
	}

	_findNode(node, data) {
		if (node === null) {
			return null
		}
		if (data === node.data) {
			return node
		}
		return data < node.data
			? this._findNode(node.left, data)
			: this._findNode(node.right, data)
	}

	remove(data) {
		this.rootNode = this._removeNode(this.rootNode, data)
	}

	_removeNode(node, data) {
		if (node === null) {
			return null
		}
		if (data < node.data) {
			node.left = this._removeNode(node.left, data)
			return node
		} else if (data > node.data) {
			node.right = this._removeNode(node.right, data)
			return node
		} else {
			if (node.left === null && node.right === null) {
				return null
			}
			if (node.left === null) {
				return node.right
			}
			if (node.right === null) {
				return node.left
			}
			let minRight = this._findMinNode(node.right)
			node.data = minRight.data
			node.right = this._removeNode(node.right, minRight.data)
			return node
		}
	}

	min() {
		if (this.rootNode === null) {
			return null
		}
		let current = this.rootNode
		while (current.left !== null) {
			current = current.left
		}
		return current.data
	}

	max() {
		if (this.rootNode === null) {
			return null
		}
		let current = this.rootNode
		while (current.right !== null) {
			current = current.right
		}
		return current.data
	}

	_findMinNode(node) {
		while (node.left !== null) {
			node = node.left
		}
		return node
	}
}

module.exports = {
	BinarySearchTree,
}
