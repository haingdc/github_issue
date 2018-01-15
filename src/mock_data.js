export let issues = [
  {
    issue_id: 3749,
    status: "open",
    title:
      "First start take more than one minute, and modify one file take 10s to recompile. Is this ok?",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3748,
    status: "open",
    title: "set webpack-uglify-plugin ecma support based on browserlist",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3737,
    status: "open",
    title: "Misleading messages about script command changes when ejecting",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3728,
    status: "open",
    title: "Code splitting and preventing duplication",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3722,
    status: "open",
    title: "Proposal: explicit named imports for non-JS/CSS assets",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3719,
    status: "open",
    title: "Inform user they've specified a HOST",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3711,
    status: "open",
    title: 'Add "debug-test" script by default',
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3694,
    status: "open",
    title: "Rest properties are broken with Jest + node v6",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3690,
    status: "open",
    title: "'Npm start' fails on react-scripts-start initial attempt",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3687,
    status: "open",
    title: "ERROR calling Images from public folder",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3683,
    status: "open",
    title: "Documentation for NODE_PATH environment variable",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3676,
    status: "open",
    title: "Can't use NODE_PATH with two directories",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3672,
    status: "open",
    title: "Preparing the next release",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3665,
    status: "open",
    title: "Invalidate cache by service worker",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3660,
    status: "open",
    title: "Add WebWorker Support",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3648,
    status: "open",
    title: "Re-compile loop while starting dev server",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3642,
    status: "open",
    title: "CSS Loading Issue in development",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3627,
    status: "open",
    title:
      "Make it clearer in error overlay when error boundary has caught an error",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3613,
    status: "open",
    title: "Service worker fails to load new dynamic/code-split chunk",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3597,
    status: "open",
    title:
      'Debugging in Chrome and FireFox not evaluating "let" and "const" vars',
    time: "12/14/2017, 8:17:17",
  },
  {
    issue_id: 3589,
    status: "open",
    title: "Disable no-mixed-operators rule",
    time: "12/13/2017, 8:17:17",
  },
  {
    issue_id: 3582,
    status: "open",
    title: "Asset paths in CSS",
    time: "12/12/2017, 8:17:17",
  },
  {
    issue_id: 3581,
    status: "open",
    title: "[Question] Killing Process on Localhost with Cygwin",
    time: "12/12/2017, 8:17:17",
  },
  {
    issue_id: 3574,
    status: "open",
    title: "Problem with new builds",
    time: "12/10/2017, 8:17:17",
  },
  {
    issue_id: 3547,
    status: "open",
    title: "Symlink behaviour",
    time: "12/4/2017, 8:17:17",
  },
];

export let issue_detail = {
  author: {
    name: "motowilliams",
    avatar: "https://avatars1.githubusercontent.com/u/22350?s=400&v=4",
    profile_site: "https://github.com/PunchyRascal",
  },
  content: `
  It sure seems to be so... This is what git returns:

  *** Please tell me who you are.
  
  Run
  
    git config --global user.email "you@example.com"
    git config --global user.name "Your Name"
  
  to set your account's default identity.
  Omit --global to set the identity only in this repository.
  
  fatal: unable to auto-detect email address (got 'eric@DESKTOP-7O2SA82.(none)')  
  `,
  issue_id: 3749,
  status: "open",
  title:
    "First start take more than one minute, and modify one file take 10s to recompile. Is this ok?",
  time: "12/10/2017, 8:17:17",
  comments: [
    {
      comment_id: "352346206",
      author: {
        name: "joaomoreno",
        avatar: "https://avatars1.githubusercontent.com/u/22350?s=400&v=4",
        profile_site: "https://github.com/PunchyRascal",
      },
      content: `What does git config --get-all user.name return, in that folder?`,
      time: "12/10/2017, 8:17:17",
    },
    {
      comment_id: "352346206",
      author: {
        name: "joaomoreno",
        avatar: "https://avatars1.githubusercontent.com/u/22350?s=400&v=4",
        profile_site: "https://github.com/PunchyRascal",
      },
      content: `Make a new CSS-class 
    
      .display-linebreak {
        white-space: pre-line;
      }
  
  Display your text with that CSS-class
  
      render() {
        const text = 'One \n Two \n Three';
        return ( 
           <div className="display-linebreak"> 
              {text} 
           </div>
        );
      }
  
  Renders with line-breaks (Sequences of whitespace will collapse into a single whitespace. Text will wrap when necessary). Like this:
      
      One
      Two
      Three
  You may also consider pre-wrap. More info here
  http://www.w3schools.com/cssref/pr_text_white-space.asp
  `,
      time: "12/10/2017, 8:17:17",
    },
    {
      comment_id: "352346206",
      author: {
        name: "joaomoreno",
        avatar: "https://avatars1.githubusercontent.com/u/22350?s=400&v=4",
        profile_site: "https://github.com/PunchyRascal",
      },
      content: `\`map\` is not a feature of React.js. You can call this function on any array you want. You should look at its [documentation at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) for that.

      Basically, map is for converting an array to another array with modified items.
      For example:
      
      
          [1,2,3].map(function(item){
              return item+1;
          })
      
      would return a new array like this: \`[(2, 3, 4)]\`
      
      In your example, map is used to convert an array with items of type "string" to an array of React.DOM.li elements.
      
      The autor of your example could also have done it like this
      
          
          var TodoList = React.createClass({
              render: function(){
                  return <ul>{this.createItems(this.props.items)}</ul>;
              },
              createItems: function(items){
                  var output = [];
                  for(var i = 0; i < items.length; i++) output.push(<li>{items[i]}</li>);
                  return output;
              }
          });
      `,
      time: "12/10/2017, 8:17:17",
    },
  ],
};
