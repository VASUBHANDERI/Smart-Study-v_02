import { Text, ScrollView, View } from "react-native";
import React from "react";
import CommandTutorial from "../components/CommandTutorial";
import { background } from "../components/Colors";
import useWindowSize from "../Hooks/useWindowSize";
Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
const LearnCommandsScreen = () => {
  const [width, height] = useWindowSize();
  return (
    <ScrollView
      style={{ backgroundColor: background }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <CommandTutorial
            command={"ls"}
            content="The ls command is used to view the contents of a directory.By default,this command will display the contents of your current workink directory .If you want to see the content of other directories, type ls and then the directory's path."
            executable={true}
          />
          <CommandTutorial
            executable={true}
            command={"rmdir"}
            argument="<dir-name>"
            content="Use rmdir to delete a directory. But rmdir can only be used to delete an empty directory. To delete a directory containing files, use rm."
          />
          <CommandTutorial
            executable={true}
            command={"rm"}
            content="Use the rm command to delete files and directories. Use rm -r  to delete just the directory. It deletes both the folder and the files it contains when using only the rm command."
            argument="<file-name>"
          />
          <CommandTutorial
            executable={true}
            command={"touch"}
            content="touch command is a way to create empty files (there are some other methods also). You can update the modification and access time of each file with the help of touch command."
            argument="<file-name>"
          />
          <CommandTutorial
            executable={true}
            command={"cd"}
            content="Linux cd command is used to change the current working directory ( i.e., in which the current user is working). The “cd” stands for 'change directory.' It is one of the most frequently used commands in the Linux terminal."
            argument="<dir-name>"
          />
          <CommandTutorial
            executable={true}
            command={"pwd"}
            content="When you first open the terminal, you are in the home directory of your user. To know which directory you are in, you can use the “pwd” command. It gives us the absolute path, which means the path that starts from the root. The root is the base of the Linux file system. It is denoted by a forward slash( / ). The user directory is usually something like /home/username."
          />
          <CommandTutorial
            command={"mv"}
            content="Use the mv command to move files through the command line. We can also use the mv command to rename a file. For example, if we want to rename the file “text” to “new”, we can use “mv text new”. It takes the two arguments, just like the cp command."
          />
          <CommandTutorial
            command={"top"}
            content="top command is used to show the Linux processes. It provides a dynamic real-time view of the running system. Usually, this command shows the summary information of the system and the list of processes or threads which are currently managed by the Linux Kernel. As soon as you will run this command it will open an interactive command mode where the top half portion will contain the statistics of processes and resource usage. And Lower half contains a list of the currently running processes."
          />
          <CommandTutorial
            command={"tar"}
            content="Use tar to work with tarballs (or files compressed in a tarball archive) in the Linux command line. It has a long list of uses. It can be used to compress and un compress different types of tar archives like .tar, .tar.gz, .tar.bz2,etc. It works on the basis of the arguments given to it. For example, “tar -cvf” for creating a .tar archive, -xvf to untar a tar archive, -tvf to list the contents of the archive, etc"
          />
        </View>
        <View style={{ flex: 1 }}>
          <CommandTutorial
            command={"mkdir"}
            content="Use the mkdir command when you need to create a folder or a directory. For example, if you want to make a directory called “DIY”, then you can type “mkdir DIY”."
            executable={true}
            argument="<dir-name>"
          />
          <CommandTutorial
            command={"chmod"}
            content="Use chmod to make a file executable and to change the permissions granted to it in Linux. Imagine you have a python code named numbers.py in your computer. You'll need to run “python numbers.py” every time you need to run it. Instead of that, when you make it executable, you'll just need to run “numbers.py” in the terminal to run the file. To make a file executable, you can use the command “chmod +x numbers.py” in this case. You can use “chmod 755 numbers.py” to give it root permissions or “sudo chmod +x numbers.py” for root executable. Here is some more information about the chmod command."
          />
          <CommandTutorial
            command={"cp"}
            content="Use the cp command to copy files through the command line. It takes two arguments: The first is the location of the file to be copied, the second is where to copy"
          />
          <CommandTutorial
            command={"cat"}
            content="Use the cat command to display the contents of a file. It is usually used to easily view programs."
          />
          <CommandTutorial
            command={"find "}
            content="The find command offers the most powerful and precise features to surface whatever you're looking for in Linux .All modern Linux distributions support the find command from the shell."
          />
          <CommandTutorial
            command={"kill"}
            content="kill command is a built-in command which is used to terminate processes manually. kill command sends a signal to a process which terminates the process. If the user doesn’t specify any signal which is to be sent along with kill command then default TERM signal is sent that terminates the process."
          />
          <CommandTutorial
            command={"du"}
            content="Use du to know the disk usage of a file in your system. If you want to know the disk usage for a particular folder or file in Linux, you can type in the command df and the name of the folder or file. For example, if you want to know the disk space used by the documents folder in Linux, you can use the command “du Documents”. You can also use the command “ls -lah” to view the file sizes of all the files in a folder."
          />
          <CommandTutorial
            command={"chown"}
            content="Linux chown command Linux chown command is used to change a file's ownership, directory, or symbolic link for a user or group. The chown stands for change owner."
          />
          <CommandTutorial
            command={"sudo"}
            content="Use tar to work with tarballs (or files compressed in a tarball archive) in the Linux command line. It has a long list of uses. It can be used to compress and un compress different types of tar archives like .tar, .tar.gz, .tar.bz2,etc. It works on the basis of the arguments given to it. For example, “tar -cvf” for creating a .tar archive, -xvf to untar a tar archive, -tvf to list the contents of the archive, etc"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LearnCommandsScreen;
