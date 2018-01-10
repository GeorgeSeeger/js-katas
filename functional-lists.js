function List() {}

function EmptyList() {}
EmptyList.prototype = new List();
EmptyList.prototype.constructor = EmptyList;

EmptyList.prototype.toString = function() { return "()"; };
EmptyList.prototype.isEmpty = function() { return true; };
EmptyList.prototype.length = function() { return 0; };
EmptyList.prototype.push = function(x) { return new ListNode(x, new EmptyList()); };
EmptyList.prototype.remove = function(x) { return this; };
EmptyList.prototype.append = function(xs) { return xs; };
EmptyList.prototype.valString = function() { return ""; };

function ListNode(value, next) { this.value = value; this.next = next; }
ListNode.prototype = new List();
ListNode.prototype.constructor = ListNode;
ListNode.prototype.isEmpty = function() { return false; };

ListNode.prototype.valString = function() { return this.value.toString() + (this.next.isEmpty() ? "" : " " + this.next.valString()); }
ListNode.prototype.toString = function() { return "(" + this.valString() + ")"; };

ListNode.prototype.head = function() { return this.value; };
ListNode.prototype.tail = function() { return this.next;  };
ListNode.prototype.length = function() { return 1 + this.next.length(); };
ListNode.prototype.push = function(x) { return new ListNode(x, this) };
ListNode.prototype.remove = function(x) {
    var node = this;  
    if (node.head() === x) { return node.tail()we }
    if (!node.tail().isEmpty() && node.tail().head() === x) { return new ListNode(node.head(), node.tail().tail().remove(x)) ;}
    var nextNode = this.next.remove(x);
    return nextNode == this.next ? this : new ListNode(this.value, nextNode);
};
ListNode.prototype.append = function(xs) {
  if (this.next.isEmpty()) {return new ListNode(this.value, xs);}
  return new ListNode(this.value, this.next.append(xs));
};