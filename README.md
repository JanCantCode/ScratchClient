# ScratchClient
A package for interacting with the [scratch website](https://scratch.mit.edu/)

## About the Package

ScratchInteract is a blazing fast package to interact with the Scratch 3.0 Website.
It comes with many different features, examples will follow later on.
Please keep in mind that this is still really experimental.
When I started making this I did not know how to really use async functions, so using it comes in a kinda weird way.
I found several other packages on npm such as __node-scratch-client__, they do have similiar features.
I'm not actually that experienced in javascript, exspecially when it comes to requests and websockets, so I had really big problems understanding the code in those.
This package is based of really simple javascript, so it is way shorter than the other packages I found, and has it's own cloud script.
*So this package is more for inspirational purposes, because it is built way simpler than (most?) other packages.*

__WARNING:__
   This package has features such as generating views on a project and setting / creating cloud variables on any project even if it is not owned by you,
   this can, in very unfortunate cases lead to your account being either blocked or deleted by the scratch team.
   If this happens, the package authors **do not** take any resposibility for it. Use this package at your own risk!

## Examples / Usage

It comes with a lot of different features, i will list some of them here.
At first, you need to use the
In whatever form you are using this, you will first have to make an instance of the Session Class. You can do that like this:

```js
account = new Session("<YourUsernameHere>", "<YourPasswordHere>")
```
You can then run several functions from this instance, for example:
```js
account.post_view(project, project_owner)
```
In this case, you can generate a view on any project by replacing the "project" with your Project ID and the "project_owner" with the Scratcher that created the project.

```js
account.scratchInteraction(interaction, value = '', value2 = '', value3 = '')
```
With the scratchInteraction function, you can do most of the interactions with the site, for example following or unfollowing users. More to this in the __docs__.

```js
account.cloud({username: "TestUser", password: "SecurePassword7"}, {method: "set", project: 234234, variable: "testvariable", value: 9})
```
This function is used to manipulate any projects cloud variables, you can add cloud variables, delete existing ones and modify values of them. Note that you can only use numbers as values in there. The values that you need to give in should be pretty self explainatory. By modifying the value of the "method" part to either "set", "create" or "delete", you can do exactly those actions.
The "value" is the value the variable should have, the "variable" is the name of the variable (the cloud symbol is automatically beeing added, you don't need to do that!), the "project" is the ID of the project, and the method has been explained above. The username and password field should be understandable.

## Help

If you have any problems using this package, either check the __docs__ or dm '-Jan-#6059' via Discord. 
You should remember, that this package is limited by the Scratch API. For example there is a limit to the amount of comments that you can post per minute.

## Credits

A big thanks goes to [TomatoCake](https://github.com/DEVTomatoCake) for helping me code this.
This package was heavily inspired by [CubeyTheCube](https://github.com/CubeyTheCube)'s ScratchClient python package.
