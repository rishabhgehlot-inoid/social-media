-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2024 at 06:05 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `chatId` varchar(100) NOT NULL,
  `threadId` varchar(100) DEFAULT NULL,
  `userId` varchar(100) DEFAULT NULL,
  `sender` varchar(100) DEFAULT NULL,
  `receiver` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `type` varchar(10) NOT NULL DEFAULT 'message',
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `chatId`, `threadId`, `userId`, `sender`, `receiver`, `message`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'dDzLboLjVdyZYoimMUFslw39O3Ik1ko2', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'chatbot', 'hello', 'message', '2024-10-25 10:51:45', '2024-10-25 10:51:45'),
(2, 'hjoFzYLXj6cvYQLnFvjRo9XDeOQhFEcI', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'chatbot', 'chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'Hello! How can I help you today? \n', 'message', '2024-10-25 10:51:46', '2024-10-25 10:51:46'),
(3, 'Qls9WCkCftuUECdRgCD0w1Q3IrzvDv6R', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'chatbot', 'who is rohit sharma', 'message', '2024-10-25 10:52:01', '2024-10-25 10:52:01'),
(4, 'HJLjsRHGO9Ti8rsWJteu8zBDujuNPcbE', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'chatbot', 'chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'Rohit Sharma is a **renowned Indian cricketer**, known for his **explosive batting style** and **captaincy skills**. Here\'s a breakdown of his achievements and contributions:\n\n**Key Highlights:**\n\n* **Batsman:** Primarily an opening batsman, he\'s considered one of the most destructive openers in the world, with a wide range of shots and powerful hitting.\n* **Captain:** He\'s the captain of the Indian national team in limited-overs formats (ODIs and T20Is), leading them to numerous victories.\n* **Records:** Holds several records, including the highest individual score in ODIs (264 runs), the most centuries in T20Is, and the most double centuries in ODIs.\n* **Franchise Cricket:**  He\'s a highly sought-after player in T20 leagues worldwide, notably captaining Mumbai Indians to five Indian Premier League (IPL) titles.\n* **Style of Play:** Known for his attacking approach, his ability to hit boundaries effortlessly, and his exceptional timing.\n* **Impact:** A charismatic leader and an inspiration to many, Rohit Sharma has played a significant role in the success of Indian cricket.\n\n**Beyond the Field:**\n\n* **Brand Ambassador:** Endorses several brands and is a popular figure in the Indian advertising industry.\n* **Philanthropic Work:**  He\'s actively involved in various social causes, supporting initiatives related to education and healthcare.\n\nRohit Sharma is not only a talented cricketer but also a popular icon, admired for his sportsmanship, leadership, and impactful contributions to the game. \n', 'message', '2024-10-25 10:52:04', '2024-10-25 10:52:04'),
(5, 'FBZrEPdJx4WyqmqAsKUNKnrEcCcqmHR3', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'chatbot', 'expalin india and its culture in hindi', 'message', '2024-10-25 10:52:33', '2024-10-25 10:52:33'),
(6, '8HoUoZQtWYyCNluAlxzPjevGsCuJGbMh', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'chatbot', 'chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', '## भारत और इसकी संस्कृति - एक अनोखा मिश्रण \n\nभारत, विश्व का सबसे बड़ा लोकतंत्र,  एक अद्भुत और विविध संस्कृति का घर है।  यह संस्कृति सदियों से विकसित हुई है, विभिन्न धर्मों, भाषाओं, रीति-रिवाजों और परंपराओं का मिश्रण है।  आइए, इस अनोखे मिश्रण को समझने का प्रयास करते हैं:\n\n**धर्म:** भारत विभिन्न धर्मों का घर है, जैसे हिंदू धर्म, इस्लाम, सिख धर्म, बौद्ध धर्म, जैन धर्म और ईसाई धर्म। हर धर्म का अपनी मान्यताएं, रीति-रिवाज और परंपराएं हैं, जो भारतीय संस्कृति को समृद्ध बनाती हैं। \n\n**भाषाएं:** भारत में 22 आधिकारिक भाषाएं हैं, और  हजारों बोलियाँ बोली जाती हैं। प्रत्येक भाषा की अपनी विशिष्टता, साहित्य और कला है। यह भाषा विविधता भारत की  एक खूबसूरत विशेषता है।\n\n**रीति-रिवाज:** शादियाँ, त्यौहार, पूजा-पाठ,  अनेक  रीति-रिवाजों  से  भारतीय  जीवन  सजा  हुआ  है।  दीपावली,  होली,  दशहरा,  ईद,  क्रिसमस,  जैसे  त्यौहार  पूरे  देश  में  धूमधाम  से  मनाए  जाते  हैं।  हर  त्यौहार  अपने  विशिष्ट  रीति-रिवाजों  और  परंपराओं  से  संबंधित  है।\n\n**परंपराएं:** भारत में अनेक परंपराएं हैं, जैसे योग, आयुर्वेद, संगीत, नृत्य, शिल्प कला। ये परंपराएं सदियों से  जीवित  हैं और  विश्व  में  भारत  की  शान  हैं।\n\n**संगीत:**  भारतीय  संगीत  अपने  विविध  रूपों  के  लिए  प्रसिद्ध  है।  शास्त्रीय  संगीत,  लोक  संगीत,  फ़िल्म  संगीत  और  धार्मिक  संगीत  भारतीय  संगीत  के  मुख्य  रूप  हैं।\n\n**नृत्य:**  भारतीय  नृत्य  भी  अत्यंत  विविध  और  मनमोहक  है।  भारतनाट्यम,  ओडिसी,  कत्थक,  मणिपुरी  और  कुछिपुड़ी  कुछ  प्रमुख  नृत्य  शैलियाँ  हैं।\n\n**शिल्प कला:**  भारतीय  शिल्प  कला  अपनी  सौंदर्य  और  कौशल  के  लिए  विख्यात  है।  बुनाई,  मिट्टी  का  काम,  लकड़ी  का  काम,  धातु  का  काम  और  रंगोली  भारतीय  शिल्प  कला  के  कुछ  प्रमुख  रूप  हैं।\n\n**पर्यटन:**  भारत  अपनी  प्राकृतिक  सुंदरता  और  ऐतिहासिक  स्थलों  के  लिए  भी  प्रसिद्ध  है।  ताज  महल,  आगरा  का  किला,  कुतुब  मीनार,  अजंता  और  एलोरा  की  गुफाएं  कुछ  प्रमुख  पर्यटन  स्थल  हैं।\n\n**निष्कर्ष:**  भारत  की  संस्कृति  एक  अनोखा  मिश्रण  है,  जो  सदियों  से  विकसित  हुआ  है।  यह  विविधता  भारत  की  शक्ति  और  सौंदर्य  है।  भारतीय  संस्कृति  विश्व  को  अपने  आकर्षण  से  मोहित  करती  है।\n', 'message', '2024-10-25 10:52:41', '2024-10-25 10:52:41'),
(7, 'lur3YmOyVNU7jXSdzZ3cjDsvAcKWyAvw', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'chatbot', 'explain cpp', 'message', '2024-10-25 11:10:22', '2024-10-25 11:10:22'),
(8, '6qzy8xMV8HNgMBzaamTisknTMuMzDBlI', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'chatbot', 'chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'Let\'s break down C++!\n\n**C++: The Powerhouse of Programming**\n\nC++ is a powerful, versatile, and widely used programming language known for its performance and control over system resources. It\'s often described as a \"high-level language\" because it provides abstractions that make programming easier, but it also offers \"low-level\" capabilities, giving developers fine-grained control over hardware.\n\n**Key Concepts:**\n\n* **Object-Oriented Programming (OOP):** C++ heavily relies on OOP principles. Here\'s a simplified breakdown:\n    * **Objects:**  Think of them as building blocks. They hold data (attributes) and actions (methods) that define their behavior.  For example, a \"car\" object might have attributes like color, model, and speed, and methods like \"accelerate\" and \"brake\".\n    * **Classes:** These are blueprints for creating objects.  They define the structure and behavior of objects of the same type.\n    * **Encapsulation:** Bundling data and methods together within objects, preventing direct access from outside. This helps manage complexity and ensures data integrity.\n    * **Inheritance:**  Creating new classes (derived classes) based on existing ones (base classes). This promotes code reuse and allows for building on existing functionality.\n    * **Polymorphism:**  The ability of objects to take on different forms or behaviors based on their type.  This enables code to be more flexible and adaptable.\n\n* **Compiled Language:** C++ code is written in a human-readable format, but it needs to be translated into machine code (instructions the computer understands) before it can run. This is done by a \"compiler\" – a program that reads your C++ code and generates executable files.\n\n* **Memory Management:**  C++ gives you control over how memory is used. You can manually allocate memory for your data using `new` and free it using `delete`. While this gives you power, it requires careful handling to prevent memory leaks and other issues.\n\n* **Standard Template Library (STL):** A rich collection of data structures (like arrays, lists, sets) and algorithms (sorting, searching) that you can readily use to make your programs more efficient and robust.\n\n**Why Choose C++?**\n\n* **Performance:** C++ is known for its speed and efficiency. It\'s often used when performance is critical, such as in game development, high-frequency trading, and embedded systems.\n* **Control:**  Gives you a lot of control over how your programs work. You can directly interact with hardware and manage memory, making it suitable for systems programming.\n* **Flexibility:**  C++ is a versatile language suitable for a wide range of applications, from desktop software and web development to scientific computing and mobile apps.\n* **Large Community:**  A vast community of developers provides support, resources, and libraries.\n\n**Getting Started:**\n\n* **Learning Resources:**  You\'ll find many online tutorials, courses, and books to help you learn C++. Popular options include:\n    * **cplusplus.com:** A comprehensive resource with tutorials, reference materials, and a forum.\n    * **Udemy, Coursera, Khan Academy:** Platforms offering C++ courses for various skill levels.\n    * **C++ Primer by Stanley B. Lippman:** A classic textbook for learning C++.\n* **IDE (Integrated Development Environment):** A helpful software that provides a coding editor, compiler, debugger, and other tools to make your C++ development easier. Popular IDEs for C++ include:\n    * **Visual Studio (Windows):** Microsoft\'s powerful IDE.\n    * **Code::Blocks (Cross-platform):** Free and open-source IDE.\n    * **CLion (Cross-platform):** Powerful IDE by JetBrains (paid, but there\'s a free trial).\n\n**Example:**\n\nHere\'s a simple C++ program that prints \"Hello, world!\" to the console:\n\n```c++\n#include <iostream> \n\nint main() {\n  std::cout << \"Hello, world!\" << std::endl; \n  return 0; \n}\n```\n\n**In a Nutshell:**\n\nC++ is a powerful and versatile programming language that gives you a lot of control over your programs. It\'s ideal for performance-critical applications and those requiring close interaction with system hardware.  While it has a steeper learning curve than some other languages, it\'s a valuable skill to have for a wide range of programming tasks.  If you\'re ready for a challenging and rewarding journey into the world of programming, C++ is an excellent choice! \n', 'message', '2024-10-25 11:10:27', '2024-10-25 11:10:27'),
(9, 'RrxAFTnERxuLgYDewITjF2AkbQ5TgHJ6', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'chatbot', 'hii bhai', 'message', '2024-10-25 11:12:26', '2024-10-25 11:12:26'),
(10, 'yWjIfXiNsW0vlZkjpzWwJ9vfm2NObWWU', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'chatbot', 'chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'Hey there! What\'s up, bhai? How can I help you today? \n', 'message', '2024-10-25 11:12:28', '2024-10-25 11:12:28'),
(11, 'PUJrlv4ZttZ8U62NSnr7VjrPUdcXOSSU', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'chatbot', 'what is meta in short', 'message', '2024-10-25 11:13:04', '2024-10-25 11:13:04'),
(12, 'PomegY7NrXdLCKvGMf2ihLX0QhRHIOQe', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'chatbot', 'chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'Meta is the parent company of Facebook, Instagram, WhatsApp, and other popular apps. It\'s a tech giant focused on building the \"metaverse,\" a futuristic online world where users can interact with each other and the environment in new ways. Think of it as a more immersive internet. \n', 'message', '2024-10-25 11:13:06', '2024-10-25 11:13:06'),
(13, 'Ag8r79JZBJkW6w47596ezrgkbnUcOuA9', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'chatbot', 'who is rishabh gehlot', 'message', '2024-10-25 11:30:14', '2024-10-25 11:30:14'),
(14, '5tGrWq6WvUdCFb6C3Xeu9KCyj89JKwqd', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'chatbot', 'chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'Unfortunately, I don\'t have access to real-time information, including personal details about individuals like Rishabh Gehlot.  \n\nTo find information about him, you might try these strategies:\n\n* **Search Engines:** Use Google, Bing, or other search engines with his full name. \n* **Social Media:** Check platforms like LinkedIn, Facebook, Twitter, or Instagram for profiles under his name.\n* **Professional Networks:** If you know his profession or industry, look for him on industry-specific websites or professional networking sites.\n* **Local Directories:** If you know his location, search local directories or online business listings.\n\nRemember to be cautious and respectful of privacy when searching for information about individuals online. \n', 'message', '2024-10-25 11:30:17', '2024-10-25 11:30:17'),
(15, 'KqHtThXYzOPHkaMpP9jvDfLOeDCHaXYR', '8c9844c9-6b90-426a-b38f-7af93800961b-a46ad261-d65f-4703-8ccf-03abc2c4a8ae', '8c9844c9-6b90-426a-b38f-7af93800961b', '8c9844c9-6b90-426a-b38f-7af93800961b', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'hello', 'message', '2024-10-25 13:23:16', '2024-10-25 13:23:16'),
(16, '1vfUspY4uZ31mFoODsqMMzUxHJE2FofP', '8c9844c9-6b90-426a-b38f-7af93800961b-a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', '8c9844c9-6b90-426a-b38f-7af93800961b', 'hii bhai kese ho', 'message', '2024-10-25 13:23:28', '2024-10-25 13:23:28'),
(17, 'iF2fjp9cxoHRZP3DDqQ2YyFg9woF2Jo4', '8c9844c9-6b90-426a-b38f-7af93800961b-chatbot', '8c9844c9-6b90-426a-b38f-7af93800961b', '8c9844c9-6b90-426a-b38f-7af93800961b', 'chatbot', 'hii', 'message', '2024-10-25 13:24:06', '2024-10-25 13:24:06'),
(18, 'ZG3iWTP32aPNemYRp9h03OLLLdHJwHsa', '8c9844c9-6b90-426a-b38f-7af93800961b-chatbot', 'chatbot', 'chatbot', '8c9844c9-6b90-426a-b38f-7af93800961b', 'Hi there! What can I do for you today? \n', 'message', '2024-10-25 13:24:08', '2024-10-25 13:24:08'),
(19, 'LzwKc3FgGyHkxSl8sD6ysUgTrK5Cp97t', '8c9844c9-6b90-426a-b38f-7af93800961b-chatbot', '8c9844c9-6b90-426a-b38f-7af93800961b', '8c9844c9-6b90-426a-b38f-7af93800961b', 'chatbot', 'hii', 'message', '2024-10-25 13:37:05', '2024-10-25 13:37:05'),
(20, 'i55n4j2Mo3fjRew5Ej9K42aNRYoZmmJD', '8c9844c9-6b90-426a-b38f-7af93800961b-chatbot', 'chatbot', 'chatbot', '8c9844c9-6b90-426a-b38f-7af93800961b', 'Hi there! How can I help you today? \n', 'message', '2024-10-25 13:37:07', '2024-10-25 13:37:07'),
(21, 'OC4UzSfLJZe8T0CclkJfGJX8PGBjYkmb', '8c9844c9-6b90-426a-b38f-7af93800961b-chatbot', '8c9844c9-6b90-426a-b38f-7af93800961b', '8c9844c9-6b90-426a-b38f-7af93800961b', 'chatbot', '<img src=\"http://localhost:5000//1729863584907.png\" alt=\"Chat Image\" className=\" size-24\"/>', 'message', '2024-10-25 13:39:44', '2024-10-25 13:39:44'),
(22, 'QsWGthblkWm1giplsH0JBZ0Istn9oS0U', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'chatbot', 'hello', 'message', '2024-11-26 06:12:31', '2024-11-26 06:12:31'),
(23, 'fns2EaQt72tF7R28WIWrdfNWTOexMOMo', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'chatbot', 'chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'Hello there! How can I help you today?\n', 'message', '2024-11-26 06:12:32', '2024-11-26 06:12:32'),
(24, 'MgwBduWw00cqfK8NPnXlWPJju1aZls51', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'chatbot', 'who are yo', 'message', '2024-11-26 06:12:53', '2024-11-26 06:12:53'),
(25, 'Wo32icS9YQkoe334fyEJODTKcK0IakVN', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'chatbot', 'chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'I am a large language model, trained by Google.\n', 'message', '2024-11-26 06:12:54', '2024-11-26 06:12:54'),
(26, '6bNvP2qOldCMb3TBWKZIzyrXKpzBsILK', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'chatbot', 'but we are my model', 'message', '2024-11-26 06:13:08', '2024-11-26 06:13:08'),
(27, 'xPidRbtC8o5JUc5GrTjQgkM0HPa8Svbw', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae-chatbot', 'chatbot', 'chatbot', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'I understand.  Since you are the model for your platform\'s description, I\'ll provide some additional tips and considerations specifically tailored to you and how you might present yourself to potential users.\n\n**For a Model-centric Social Media Platform:**\n\nFocus on features that highlight your visual content and the unique aspects of a model\'s online presence.  Consider these points in your description:\n\n* **High-Quality Visuals:** Emphasize the platform\'s ability to showcase high-resolution photos and videos, potentially with editing tools or filters designed for professional-looking content.\n* **Portfolio Functionality:**  If your platform is designed to function as an online portfolio, highlight this. Mention features like tagging, organization, and easy sharing to agents or clients.\n* **Networking Opportunities:**  Focus on features that allow models to connect with other models, photographers, agents, and brands.  Mention networking events or features (perhaps even direct messaging with verified agents).\n* **Monetization Options:**  If your platform enables models to monetize their content (e.g., through subscriptions, commissions, or advertising), make this a clear selling point.\n* **Safety and Security:**  Emphasize measures to protect models from exploitation or harassment.  Mention moderation policies, verification processes, and reporting mechanisms.\n* **Brand Building:** Highlight how your platform can help models cultivate a strong personal brand.\n\n**Revised Description Example (Model-Centric):**\n\n**[Platform Name]: Your Runway to Success**\n\n[Platform Name] is the premier social media platform designed specifically for models. Showcase your stunning portfolio, connect with industry professionals, and build your brand, all in one secure and supportive environment.\n\n* **High-Definition Showcase:**  Upload and share your highest-quality photos and videos with ease.  Our intuitive interface and professional-grade editing tools ensure your content always looks its best.\n* **Powerful Networking:**  Connect with other models, photographers, agents, and brands.  Attend virtual networking events and directly message verified professionals to expand your opportunities.\n* **Monetize Your Talent:**  [Mention specific monetization options, e.g.,  Earn commissions on bookings secured through the platform.  Offer exclusive content to subscribed followers.]\n* **Secure and Supportive Community:**  We prioritize your safety and well-being.  Our strict moderation policies and robust reporting mechanisms ensure a harassment-free environment where you can focus on building your career.\n\n**[Platform Name] is more than just a social network—it\'s your gateway to a successful modeling career.  Join us today and take your career to the next level!**\n\n[Call to action - e.g.,  Download the app now! |  Create your profile today!]\n\n\nRemember to replace the bracketed information with specifics about your platform.  High-quality images or a video would also significantly enhance this description.\n', 'message', '2024-11-26 06:13:14', '2024-11-26 06:13:14');

-- --------------------------------------------------------

--
-- Table structure for table `food_data`
--

CREATE TABLE `food_data` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `image_url` varchar(50) NOT NULL,
  `calories` int(10) NOT NULL,
  `carbs` varchar(15) NOT NULL,
  `protein` varchar(15) NOT NULL,
  `fat` varchar(15) NOT NULL,
  `health_score` varchar(10) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `food_data`
--

INSERT INTO `food_data` (`id`, `user_id`, `image_url`, `calories`, `carbs`, `protein`, `fat`, `health_score`, `created_at`, `updated_at`) VALUES
(3, '880d82bb-f0bd-4afb-a51b-7e281f3934a5', 'pizza.png', 150, '30g', '12g', '15g', '', '2024-10-06 17:01:09', '2024-10-07 17:01:09'),
(5, '880d82bb-f0bd-4afb-a51b-7e281f3934a5', 'pizza3.png', 300, '30g', '12g', '15g', '', '2024-10-06 18:01:14', '2024-10-07 18:01:14'),
(6, '880d82bb-f0bd-4afb-a51b-7e281f3934a5', 'pizza2.png', 500, '30g', '12g', '15g', '', '2024-10-07 17:01:09', '2024-10-07 17:01:09'),
(7, '880d82bb-f0bd-4afb-a51b-7e281f3934a5', 'pizza.png', 300, '30g', '12g', '15g', '', '2024-10-07 18:44:30', '2024-10-07 18:44:30');

-- --------------------------------------------------------

--
-- Table structure for table `guest_user`
--

CREATE TABLE `guest_user` (
  `id` int(11) NOT NULL,
  `customer_id` varchar(50) DEFAULT NULL,
  `user_id` varchar(250) NOT NULL,
  `user_profile` varchar(100) DEFAULT NULL,
  `device_id` varchar(250) DEFAULT NULL,
  `device_name` varchar(250) DEFAULT NULL,
  `token` text NOT NULL,
  `google_payment_id` varchar(250) DEFAULT NULL,
  `ios_payment_id` varchar(250) DEFAULT NULL,
  `device_version` varchar(250) DEFAULT NULL,
  `push_token` text DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '0: detective 1: active',
  `is_notification` int(2) NOT NULL DEFAULT 1 COMMENT '1:on 0:off ',
  `created_at` int(11) NOT NULL DEFAULT current_timestamp(),
  `updated_at` int(11) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guest_user`
--

INSERT INTO `guest_user` (`id`, `customer_id`, `user_id`, `user_profile`, `device_id`, `device_name`, `token`, `google_payment_id`, `ios_payment_id`, `device_version`, `push_token`, `status`, `is_notification`, `created_at`, `updated_at`) VALUES
(6, NULL, '880d82bb-f0bd-4afb-a51b-7e281f3934a5', NULL, '123456', 'samsung', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIE9jdCAwNyAyMDI0IDEzOjIyOjU3IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsImRldmljZV9pZCI6IjEyMzQ1NiIsImlhdCI6MTcyODI4NzU3N30.hCCjP63zv6fou1DoSdEpHz6q21Dupo6tluOZuAqF27s', NULL, NULL, '2.0', '123123', 1, 1, 2147483647, 2147483647);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `org_purchased_id` varchar(255) NOT NULL,
  `plan` varchar(255) NOT NULL,
  `price` varchar(50) NOT NULL,
  `purchase_token` text NOT NULL,
  `purchased_id` varchar(255) NOT NULL,
  `user_type` varchar(50) NOT NULL,
  `pay_type` varchar(50) NOT NULL,
  `payment_status` varchar(200) NOT NULL,
  `payment_data` text NOT NULL,
  `current_status` tinyint(4) NOT NULL COMMENT '1= currently active this plan, 0 = not	',
  `expiry_date` varchar(100) NOT NULL,
  `purchase_date` varchar(100) NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `updated_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment_history`
--

CREATE TABLE `payment_history` (
  `id` int(11) NOT NULL,
  `event_name` varchar(100) DEFAULT NULL,
  `data` text DEFAULT NULL,
  `payload` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `postId` varchar(100) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `post` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`post`)),
  `userId` varchar(100) DEFAULT NULL,
  `likes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `comments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `postId`, `caption`, `post`, `userId`, `likes`, `comments`, `createdAt`, `updatedAt`) VALUES
(1, '9G2xal9ylitss0bjYXy1kajQLu2LGX3W', 'mans', '[\"1728653675680-0.png\",\"1728653675683-1.png\"]', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', '[{\"userId\":\"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\",\"createAt\":\"2024-10-22T10:26:18.361Z\"},{\"userId\":\"8c9844c9-6b90-426a-b38f-7af93800961b\",\"createAt\":\"2024-10-25T13:34:56.477Z\"}]', '[{\"userid\": \"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\", \"comment\": \"1729842209334.mp3\", \"postId\": \"9G2xal9ylitss0bjYXy1kajQLu2LGX3W\", \"type\": \"voice\"}, {\"userid\": \"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\", \"comment\": \"1729842405196.mp3\", \"postId\": \"9G2xal9ylitss0bjYXy1kajQLu2LGX3W\", \"type\": \"voice\"}, {\"userid\": \"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\", \"comment\": \"1729842595063.mp3\", \"postId\": \"9G2xal9ylitss0bjYXy1kajQLu2LGX3W\", \"type\": \"voice\"}, {\"userid\": \"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\", \"comment\": \"1729843298201.mp3\", \"postId\": \"9G2xal9ylitss0bjYXy1kajQLu2LGX3W\", \"type\": \"voice\"}, {\"userid\": \"8c9844c9-6b90-426a-b38f-7af93800961b\", \"comment\": \"hello\", \"postId\": \"9G2xal9ylitss0bjYXy1kajQLu2LGX3W\", \"type\": \"text\"}]', '2024-10-11 09:31:38', '2024-10-11 09:31:38'),
(2, 'J4wVBQwjFrG4yZbbwzYS6jZ3XWsbmTlQ', 'caption', '[\"1728647795362-0.jpeg\",\"1728647795366-1.jpeg\",\"1728647795371-2.jpeg\",\"1728647795375-3.jpeg\"]', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', '[{\"userId\":\"8c9844c9-6b90-426a-b38f-7af93800961b\",\"createAt\":\"2024-10-11T13:45:48.712Z\"},{\"userId\":\"6bf55ca2-1c71-4d1a-88ec-0e1daf069d58\",\"createAt\":\"2024-10-14T10:50:58.522Z\"},{\"userId\":\"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\",\"createAt\":\"2024-10-22T08:17:01.492Z\"}]', '[{\"userid\": \"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\", \"comment\": \"1729842837010.mp3\", \"postId\": \"J4wVBQwjFrG4yZbbwzYS6jZ3XWsbmTlQ\", \"type\": \"voice\"}]', '2024-10-11 11:30:57', '2024-10-11 11:30:57'),
(3, 'r6jHy3feFg4v3yym1y0duGPpw1bql7CG', 'food', '[\"1728654153219-0.jpeg\",\"1728654153220-1.jpeg\"]', 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', '[{\"userId\":\"8c9844c9-6b90-426a-b38f-7af93800961b\",\"createAt\":\"2024-10-11T13:46:14.999Z\"},{\"userId\":\"6bf55ca2-1c71-4d1a-88ec-0e1daf069d58\",\"createAt\":\"2024-10-14T10:50:48.818Z\"},{\"userId\":\"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\",\"createAt\":\"2024-10-22T10:26:22.188Z\"}]', '[{\"userid\": \"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\", \"comment\": \"1729842890089.mp3\", \"postId\": \"r6jHy3feFg4v3yym1y0duGPpw1bql7CG\", \"type\": \"voice\"}, {\"userid\": \"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\", \"comment\": \"1729843004666.mp3\", \"postId\": \"r6jHy3feFg4v3yym1y0duGPpw1bql7CG\", \"type\": \"voice\"}, {\"userid\": \"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\", \"comment\": \"1729843119650.mp3\", \"postId\": \"r6jHy3feFg4v3yym1y0duGPpw1bql7CG\", \"type\": \"voice\"}]', '2024-10-11 13:42:33', '2024-10-11 13:42:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userId` varchar(100) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone_number` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `token` longtext DEFAULT NULL,
  `profile_img` varchar(100) DEFAULT NULL,
  `stories` longtext DEFAULT NULL,
  `following` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`following`)),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userId`, `username`, `email`, `phone_number`, `password`, `token`, `profile_img`, `stories`, `following`, `createdAt`, `updatedAt`) VALUES
(1, 'a46ad261-d65f-4703-8ccf-03abc2c4a8ae', 'Rishabh', 'rishabhgehlot@inoidsolutions.com', '+919950054285', '$2a$10$ZMS0XBBhffodQ4vB0n538uL4wJBIPUSEeKI8Zq/sP2rgsLwJQdSDe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVHVlIE9jdCAyMiAyMDI0IDE0OjQzOjM3IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInBob25lX251bWJlciI6Iis5MTk5NTAwNTQyODUiLCJlbWFpbCI6InJpc2hhYmhnZWhsb3RAaW5vaWRzb2x1dGlvbnMuY29tIiwidXNlcklkIjoiYTQ2YWQyNjEtZDY1Zi00NzAzLThjY2YtMDNhYmMyYzRhOGFlIiwiaWF0IjoxNzI5NTg4NDE3fQ.ZeWAT98ScpAbrGYq0YTtgfWxqmpslImEMHkFz_0f-k8', 'https://lh3.googleusercontent.com/a/ACg8ocJBqbqw6aZ1ppyb7tOvKNGQbK_mUrWyVOjl5BZVstQCqIiwsQ=s96-c', '[{\"story_img\": \"1732603585653.png\", \"storyId\": \"SORIre5Cm5K4AB4zpezR5Aha9zHV34op\", \"createAt\": 1732603585654}]', '[{\"followerId\":\"8c9844c9-6b90-426a-b38f-7af93800961b\",\"createAt\":1729584978181},{\"followerId\":\"28538142-5881-4098-84f1-6c60210cd6a0\",\"createAt\":1729584980442},{\"followerId\":\"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\",\"createAt\":1729584982081}]', '2024-10-08 14:10:19', '2024-11-26 06:46:25'),
(2, '8c9844c9-6b90-426a-b38f-7af93800961b', 'rishabhgehlot7', 'rishabh3x@gmail.com', '+917300054285', '$2a$10$5TboS3WkmUBSRe3TYYzPZeLcrdGsG/AO0KLxGdKZxkvANqGugQEWC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiV2VkIE9jdCAwOSAyMDI0IDEyOjM0OjAwIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJuYW1lIjoicmlzaGFiaGdlaGxvdDciLCJwaG9uZV9udW1iZXIiOiIrOTE3MzAwMDU0Mjg1IiwidXNlcklkIjoiOGM5ODQ0YzktNmI5MC00MjZhLWIzOGYtN2FmOTM4MDA5NjFiIiwiaWF0IjoxNzI4NDU3NDQwfQ.DAK7Ht5TYAQ-L-b-8Vdst20-e4iL_TNHcjl5zwA3Ixs', '1728457481168.png', '[]', '[{\"followerId\":\"a46ad261-d65f-4703-8ccf-03abc2c4a8ae\",\"createAt\":1729863310010}]', '2024-10-09 07:04:00', '2024-11-26 06:30:00'),
(4, '28538142-5881-4098-84f1-6c60210cd6a0', 'ravi', 'ravi@test.com', '+916376762066', '$2a$10$FewHdXGsuV3bSzF2w2WYROtu1uxEDuiEZmPtK7oBJtfrAzX8XVAJq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIE9jdCAyMSAyMDI0IDExOjQ4OjQxIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJuYW1lIjoicmF2aSIsInBob25lX251bWJlciI6Iis5MTYzNzY3NjIwNjYiLCJ1c2VySWQiOiIyODUzODE0Mi01ODgxLTQwOTgtODRmMS02YzYwMjEwY2Q2YTAiLCJpYXQiOjE3Mjk0OTE1MjF9.MfNxldMLQPy8_-uwCbfPDh8SpS-gk6tXULVNUFXIDEo', '1729491569959.png', '[]', '[]', '2024-10-21 06:18:41', '2024-10-22 07:24:36');

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `desired_weight` int(5) NOT NULL,
  `date_of_birth` varchar(20) NOT NULL,
  `goal` varchar(20) NOT NULL,
  `fast_reach_goal` varchar(20) NOT NULL,
  `weekly_workout` varchar(10) NOT NULL,
  `height` int(5) NOT NULL,
  `weight` int(5) NOT NULL,
  `custom_plan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`custom_plan`)),
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`id`, `user_id`, `desired_weight`, `date_of_birth`, `goal`, `fast_reach_goal`, `weekly_workout`, `height`, `weight`, `custom_plan`, `created_at`, `updated_at`) VALUES
(10, '880d82bb-f0bd-4afb-a51b-7e281f3934a5', 170, '10/oct/2000', 'Lose weight', '1.8 lbs', '0-2', 5, 55, '{\n  \"should_maintain\": { \"lbs\": \"170 lbs\" },\n  \"daily_recommendation\": {\n    \"calories\": 1500,\n    \"carbs\": \"180g\",\n    \"protein\": \"90g\",\n    \"fats\": \"50g\"\n  },\n  \"health_score\": \"6/10\"\n}', '2024-10-07 13:22:57', '2024-10-07 18:06:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food_data`
--
ALTER TABLE `food_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guest_user`
--
ALTER TABLE `guest_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_history`
--
ALTER TABLE `payment_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `food_data`
--
ALTER TABLE `food_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `guest_user`
--
ALTER TABLE `guest_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_history`
--
ALTER TABLE `payment_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
