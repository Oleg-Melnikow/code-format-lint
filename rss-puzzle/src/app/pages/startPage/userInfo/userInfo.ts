import createElement from 'helpers/createElement';
import { initialState } from 'state/initialState';
import { BaseClass } from 'types/interfaces';

class UserInfo implements BaseClass {
  draw(root: HTMLElement): void {
    if (initialState.user) {
      const { name, surname } = initialState.user;
      const greetingMessage = `
        Dear ${name} ${surname}! 
        Weclome to RSS PUZZLE!
        We wish you a good time!
        `;
      root.append(
        createElement('p', { class: 'user-greeting' }, greetingMessage)
      );
    }
  }
}

export default UserInfo;
