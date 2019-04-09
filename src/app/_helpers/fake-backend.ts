import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';

    // wrap in delayed observable to simulate server api call
    return (
      of(null)
        .pipe(
          mergeMap(() => {
            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
              // get new user object from post body
              const newUser = request.body;
              // validation
              const duplicateUser = users.filter(user => {
                return user.email === newUser.email;
              }).length;
              if (duplicateUser) {
                return throwError({ error: { message: 'Username "' + newUser.email + '" is already registered.' } });
              }

              // save new user
              newUser.id = users.length + 1;
              newUser.displayName = '';
              newUser.imageUrl = './assets/sample-images/user/person_'+newUser.id+'.jpg';
              newUser.testimonial = 'It changed my life to a much healthier life style';
              newUser.stories = ['3b9q40sdfklneg'];
              newUser.pledges = ['123o87trqx4'];
              newUser.isVerified = false;
              newUser.verificationType = 'email';
              newUser.verificationCode = '1234';
              newUser.createdAt = new Date();
              newUser.updatedAt = new Date();
              users.push(newUser);
              localStorage.setItem('users', JSON.stringify(users));

              // respond 200 OK
              return of(new HttpResponse({ status: 200 }));
            }


            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
              const filteredUsers = users.filter(user => {
                return user.email === request.body.email && user.password === request.body.password;
              });

              if (filteredUsers.length) {
                // if login details are valid return 200 OK with user details and fake jwt token
                const user = filteredUsers[0];
                const body = {
                  id: user.id,
                  email: user.email,
                  password: user.password,
                  displayName: user.displayName,
                  imageUrl: user.imageUrl,
                  testimonial: user.testimonial,
                  stories: user.stories,
                  pledges: user.pledges,
                  isVerified: user.isVerified,
                  verificationType: user.verificationType,
                  verificationCode: user.verificationCode,
                  token: token
                };

                return of(new HttpResponse({ status: 200, body: body }));
              } else {
                // else return 400 bad request
                return throwError({ error: { message: 'Username or password is incorrect' } });
              }
            }

            
            // Verify user
            if (request.url.endsWith('/users/verify') && request.method === 'POST') {
              //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                // find user by id in users array
                const filteredUsers = users.filter(user => {
                  return user.id === request.body.id;
                });

                if (filteredUsers.length) {
                  // if login details are valid return 200 OK with user details and fake jwt token
                  const user = filteredUsers[0];
                  if (user.verificationType === 'email') {
                    if (user.verificationCode === request.body.verificationCode) {
                      // save changes
                      filteredUsers[0].isVerified = true;
                      filteredUsers[0].verificationCode = null;
                      localStorage.setItem('users', JSON.stringify(users));

                      user.isVerified = true;
                      user.verificationCode = null;

                      const body = {
                        id: user.id,
                        email: user.email,
                        displayName: user.displayName,
                        imageUrl: user.imageUrl,
                        testimonial: user.testimonial,
                        stories: user.stories,
                        pledges: user.pledges,
                        isVerified: user.isVerified,
                        verificationType: user.verificationType,
                        verificationCode: user.verificationCode,
                        token: token
                      };
                      return of(new HttpResponse({ status: 200, body: body }));
                    } else {
                      // else return 400 bad request
                      return throwError({ error: { message: 'Wrong verification Code!' } });
                    }
                  } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'User verification is not required!' } });
                  }
                } else {
                  // else return 400 bad request
                  return throwError({ error: { message: 'Invalid User' } });
                }
              // } else {
              //   // return 401 not authorised if token is null or invalid
              //   return throwError({ status: 401, error: { message: 'Unauthorised' } });
              // }
            }


            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
              if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                return of(new HttpResponse({ status: 200, body: users }));
              } else {
                // return 401 not authorised if token is null or invalid
                return throwError({ status: 401, error: { message: 'Unauthorised' } });
              }
            }

            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
              // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
              if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                // find user by id in users array
                const urlParts = request.url.split('/');
                const id = parseInt(urlParts[urlParts.length - 1]);
                const matchedUsers = users.filter(user => {
                  return user.id === id;
                });
                const user = matchedUsers.length ? matchedUsers[0] : null;

                return of(new HttpResponse({ status: 200, body: user }));
              } else {
                // return 401 not authorised if token is null or invalid
                return throwError({ status: 401, error: { message: 'Unauthorised' } });
              }
            }


            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
              // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
              if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                // find user by id in users array
                const urlParts = request.url.split('/');
                const id = parseInt(urlParts[urlParts.length - 1]);
                for (let i = 0; i < users.length; i++) {
                  const user = users[i];
                  if (user.id === id) {
                    // delete user
                    users.splice(i, 1);
                    localStorage.setItem('users', JSON.stringify(users));
                    break;
                  }
                }

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
              } else {
                // return 401 not authorised if token is null or invalid
                return throwError({ status: 401, error: { message: 'Unauthorised' } });
              }
            }

            //Create Story
            // 'https://placeimg.com/640/480/any', 'the corp 2 is coming', 'story/'


            // pass through any requests not handled above
            return next.handle(request);
          })
        )

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize())
    );
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
