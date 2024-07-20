class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

const button_value = document.getElementById('insert_button');
const inp_val = document.getElementById('input_val');
let prevnode = null;
let index = 1;
const list_container = document.querySelector('.list-container');
let head = null;


function createArrowHTML(index) {
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div3');

    div1.classList.add('arrow-container');
    div1.id = `arrow${index}`
    div2.classList.add('tail');
    div3.classList.add('head');
    div3.innerHTML = `<i class="arrow right"></i>`;

    div1.append(div2);
    div1.append(div3);

    return div1;
}

button_value.addEventListener('click', () => {
    let data = inp_val.value;
    inp_val.value = '';
    let node = new Node(data);

    if (prevnode != null) {
        const prevAddress = document.getElementById(`next${index - 1}`);
        if (prevAddress) {
            prevAddress.innerHTML = '';  // Update the previous node's next element
        }
        prevnode.next = node;
        prevnode = node;
    } else {
        head = node;
        prevnode = node;
    }

    if(prevnode != head) {
        let arrow = createArrowHTML(index);
        list_container.append(arrow);
    } 

   let div1 = createAndAppendNode(data,index,node);

    index++;

    list_container.append(div1);
    
});


function createAndAppendNode(val, idx,node) {
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');

    div1.classList.add('list');
    div1.id = `list${idx}`;

    div2.classList.add('node');
    div2.id = `node${idx}`;
    div2.innerHTML = `${val}`;

    div3.classList.add('next');
    div3.id = `next${idx}`;
    div3.innerHTML = `null`;

    div1.appendChild(div2);
    div1.appendChild(div3);

    return div1;
}




function printlinkedlist() {
    let current = head;
    while (current != null) {
        console.log(current.val);
        current = current.next;
    }
}



const traversal = document.querySelector('.traversal');

traversal.addEventListener('click',travellist);

function travellist(){
    let curr = head;
    let c = 1;
    let prevcolor = null;
    
    const idinterval = setInterval(()=>{
        if(curr == null) {
            prevcolor.classList.remove('colour');
            clearInterval(idinterval);
            return;
        }
        
        if(prevcolor)
        {
            prevcolor.classList.remove('colour');
        }

        // const val_container = document.getElementById(`n${c}`);
        // const temp = val_container.closest(".list");
        // temp.classList.add('colour');

        //const val_container = document.getElementById(`next${c}`);
       // if (val_container) {
            const temp = document.getElementById(`list${c}`);
            if (temp) {
                temp.classList.add('colour');
                prevcolor = temp;
            }
      //  }
        
        c=c+1;
        console.log(curr.val);
        curr = curr.next;
    },1000);
}

const do_add = document.querySelector('.done_add');

do_add.addEventListener('click', () => {
    const num = document.getElementById('input_added').value;
    const idx = parseInt(document.getElementById('index').value); // Parse index as integer
    const newnode = new Node(num);

    let curr = head;
    let prevnode = null;
    let c = 1;

    // Handle adding at index 1 (head of the list)
    if (idx === 1) {
        newnode.next = head;
        head = newnode;

        // Update the IDs of the subsequent nodes
        for (let i = index; i > 0; i--) {
            let listElement = document.getElementById(`list${i}`);
            if (listElement) {
                listElement.id = `list${i + 1}`;
            }
            let nextElement = document.getElementById(`next${i}`);
            if (nextElement) {
                nextElement.id = `next${i + 1}`;
            }
        }

        // Create new node in the DOM
        let div1 = createAndAppendNode(num, 1);
        let temp = div1.querySelector('.next');
        temp.innerHTML = '';
        list_container.prepend(div1); // Insert at the beginning

        // Create arrow for the new node
        let arrow = createArrowHTML(1);
        list_container.insertBefore(arrow, div1.nextSibling); // Insert arrow after the new node

        index++;
    } else {
        // Handle adding at other indices
        while (curr != null && c < idx) {
            prevnode = curr;
            curr = curr.next;
            c++;
        }

        if (prevnode != null) {
            newnode.next = curr;
            prevnode.next = newnode;

            // Update the IDs of the subsequent nodes
            for (let i = index; i > idx; i--) {
                let listElement = document.getElementById(`list${i - 1}`);
                if (listElement) {
                    listElement.id = `list${i}`;
                }
                let nextElement = document.getElementById(`next${i - 1}`);
                if (nextElement) {
                    nextElement.id = `next${i}`;
                }
            }

            // Create new node in the DOM
            let div1 = createAndAppendNode(num, idx);
            let temp = div1.querySelector('.next');
            temp.innerHTML = '';
            let prevelement = document.getElementById(`list${idx - 1}`);
            prevelement.insertAdjacentElement('afterend', div1);

            // Create arrow for the new node
            let arrow = createArrowHTML(idx);
            prevelement.insertAdjacentElement('afterend', arrow);

            index++;
        }
    }
});

const do_delete = document.querySelector('.done_delete');

do_delete.addEventListener('click', () => {
    const idx = parseInt(document.getElementById('index_d').value); // Parse index as integer
    let curr = head;
    let prevnode = null;
    let c = 1;

    // Handle deleting the head node
    if (idx === 1) {
        if (head != null) {
            head = head.next; // Update head to the next node
            let req_element = document.getElementById(`list1`);
            let req_arrow = document.getElementById(`arrow1`);
            if (req_arrow) list_container.removeChild(req_arrow); // Remove arrow if exists
            list_container.removeChild(req_element); // Remove node element

            // Update the IDs of the subsequent nodes and arrows
            for (let i = 2; i < index; i++) {
                const temp = document.getElementById(`next${i}`);
                if (temp) temp.id = `next${i - 1}`;
                const temp1 = document.getElementById(`list${i}`);
                if (temp1) temp1.id = `list${i - 1}`;
                const arrow = document.getElementById(`arrow${i}`);
                if (arrow) arrow.id = `arrow${i - 1}`;
            }

            index--; // Decrement the index counter

            // If there are no more nodes, set head to null
            if (head == null) {
                let lastElement = document.getElementById(`next${index - 1}`);
                if (lastElement) lastElement.innerHTML = 'null';
            }
        }
    } else {
        // Handle deleting other nodes
        while (curr != null && c < idx) {
            prevnode = curr;
            curr = curr.next;
            c++;
        }

        if (curr != null) {
            prevnode.next = curr.next; // Update next pointer of the previous node

            let req_element = document.getElementById(`list${idx}`);
            let req_arrow = document.getElementById(`arrow${idx}`);
            if (req_arrow) list_container.removeChild(req_arrow); // Remove arrow if exists
            list_container.removeChild(req_element); // Remove node element

            // Update the IDs of the subsequent nodes and arrows
            for (let i = idx + 1; i < index; i++) {
                const temp = document.getElementById(`next${i}`);
                if (temp) temp.id = `next${i - 1}`;
                const temp1 = document.getElementById(`list${i}`);
                if (temp1) temp1.id = `list${i - 1}`;
                const arrow = document.getElementById(`arrow${i}`);
                if (arrow) arrow.id = `arrow${i - 1}`;
            }

            index--; // Decrement the index counter

            // Set the next pointer of the new last node to null and update its DOM element
            if (prevnode.next == null) {
                let lastElement = document.getElementById(`next${index - 1}`);
                if (lastElement) lastElement.innerHTML = 'null';
            }
        }
    }
});
