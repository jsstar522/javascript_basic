import React, { Component } from 'react';
import Header from './components/Header';
import Container from './components/Container';
import ViewSelector from './components/ViewSelector';
import FloatingButton from './components/FloatingButton';
import ContactModal from './components/ContactModal';
import Dimmed from './components/Dimmed';
import shortid from 'shortid';
import ContactList from './components/ContactList';

import oc from 'open-color';
// 랜덤색상
function generateRandomColor() {
    const colors = [
        'gray',
        'red',
        'pink',
        'grape',
        'violet',
        'indigo',
        'blue',
        'cyan',
        'teal',
        'green',
        'lime',
        'yellow',
        'orange'
    ];

    // 0 부터 12까지 랜덤 숫자
    const random = Math.floor(Math.random() * 13);

    return oc[colors[random]][6];
}

class App extends Component {
    // state 정의
    state = {
        view: 'list',
        modal: {
            visible: false,
            mode: null  // 생성(create) 혹은 수정(modify) 모드
        },
        contacts: []
    }
    // 즐겨찾기/목록 선택시 state 업데이트
    handleSelectView = (view) => this.setState({ view })

    // 모달 메서드
    modalHandler = {
        show: (mode, payload) => {
            this.setState({
                modal: {
                    mode,
                    visible: true,
                    ...payload
                }
            })
        },
        hide: () => {
            this.setState({
                modal: {
                    ...this.state.modal,
                    visible: false
                }
            })
        },
        change: ({ name, value }) => {
            this.setState({
                modal: {
                    ...this.state.modal,
                    [name]: value
                }
            })
        },
        action: {
            create: () => {
                const id = shortid.generate();
                const { contacts, modal: { name, phone, color } } = this.state;
                const contact = {
                    id,
                    name,
                    phone,
                    color,
                    favorite: false
                };
                this.setState({
                    // 불변성 유지. concat으로 해도 상관없다.
                    contacts: [...contacts, contact]
                });
                //작업이 완료되면 창 닫기
                this.modalHandler.hide();
            },
            modify: () => {
                const {
                    modal: { name, phone, index },
                    contacts
                } = this.state;

                const item = contacts[index];
                
                this.setState({
                    contacts: [
                        ...contacts.slice(0, index),
                        {
                            ...item,
                            name,
                            phone
                        },
                        ...contacts.slice(index+1, contacts.length)
                    ]
                });

                this.modalHandler.hide();
            },
            remove: () => {
                // 레퍼런스 준비
                const {
                    modal: { index },
                    contacts
                } = this.state;

                // 상태 변경
                this.setState({
                    contacts: [
                        ...contacts.slice(0, index),
                        ...contacts.slice(index + 1, contacts.length) 
                    ]
                });

                // 모달 닫기
                this.modalHandler.hide();
            }
        }
    }

    // FloatingButton을 클릭했을 때
    handleFloatingButtonClick = () => {
        const { view } = this.state;
        // 현재 view list 바꾸기
        if (view !== 'list')
            this.setState({ view: 'list' });
        // 목록 추가 모달 띄우기
        this.modalHandler.show(
            'create',   //mode
            {
                name: '',
                phone: '',
                color: generateRandomColor()
            }
        );
    }

    itemHandler = {
        toggleFavorite: null,
        openModify: (id) => {
            const { contacts } = this.state;
            const index = contacts.findIndex(contact => contact.id === id);
            const item = this.state.contacts[index];

            this.modalHandler.show(
                'modify',
                {
                    ...item,
                    index
                }
            );
        }
    }

    render() {
        const { handleSelectView, handleFloatingButtonClick, modalHandler, itemHandler } = this;

        const { view, modal, contacts } = this.state
        return (
            <div>
                <Header />
                <ViewSelector onSelect={handleSelectView} selected={view} />
                <Container visible={view === 'favorite'}>첫번째 버튼 클릭시 나타나는 텍스트입니다</Container>
                <Container visible={view === 'list'}>
                    <ContactList 
                        contacts={contacts}
                        onOpenModify={itemHandler.openModify}
                    />
                </Container>
                <Dimmed visible={modal.visible} />
                <ContactModal 
                    {...modal} 
                    onHide={modalHandler.hide} 
                    onChange={modalHandler.change} 
                    onAction={modalHandler.action[modal.mode]}
                    onRemove={modalHandler.action.remove}
                />
                <FloatingButton onClick={handleFloatingButtonClick} />
            </div>
        );
    }
}
export default App;