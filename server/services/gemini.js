const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Platform Description:\n\nOur social media platform is a dynamic space designed to foster meaningful connections, encourage creativity, and facilitate the sharing of diverse content. Users can post updates, share multimedia (including photos, videos, and 3D images), and engage in real-time discussions through chat features, voice comments, and live streaming.\n\nWith a focus on community building, our platform emphasizes user interaction through likes, comments, and sharing capabilities, while also allowing for personalized experiences via tailored content feeds. The integration of voice and video call features enhances communication, making it easier for users to connect with friends and family or collaborate with colleagues.\n\nOur application employs cutting-edge technology for data validation, error handling, and seamless user experiences. This ensures that our users can enjoy a reliable and secure environment while engaging with content. Additionally, we prioritize user privacy and data protection, fostering a safe community for all members.\n\nOverall, our platform is more than just a social network; it's a hub for collaboration, creativity, and connection, designed to adapt and evolve based on user feedback and engagement trends."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "This is a great start to a platform description! Here's a breakdown of what you've done well and some suggestions for improvement:\n\n**Strengths:**\n\n* **Clear Value Proposition:** You clearly state the platform's purpose: fostering connections, encouraging creativity, and facilitating diverse content sharing.\n* **Emphasis on Features:** You highlight key features like multimedia sharing, real-time discussions, personalized feeds, and voice/video calls.\n* **Focus on Community:** You emphasize the importance of user interaction and community building.\n* **Tech and Security:** You mention cutting-edge technology for reliability, security, and user experience.\n* **User-Centric Approach:** You emphasize adapting and evolving based on user feedback.\n\n**Suggestions for Improvement:**\n\n* **Target Audience:** While you mention diverse content, be more specific about who your platform is for. Are you aiming for a general audience, a specific demographic, or a niche community?  \n* **Unique Selling Proposition (USP):** What sets your platform apart from other social media platforms? What unique features or functionalities do you offer?\n* **Examples and Use Cases:** Provide concrete examples of how users can utilize the platform to achieve their goals (e.g., collaborating on a project, sharing travel experiences, connecting with like-minded individuals).\n* **Visuals:**  Consider adding a visual element to your description, such as a logo or screenshot, to enhance engagement. \n* **Call to Action:**  End your description with a clear call to action, encouraging users to learn more, sign up, or download the app.\n\n**Here's a revised version incorporating these suggestions:**\n\n**Platform Description:**\n\n**[Platform Name]** is a dynamic social media platform designed to foster meaningful connections, encourage creativity, and facilitate the sharing of diverse content for [target audience description - e.g., young professionals, gamers, creative artists].\n\nOur platform goes beyond traditional social networking by:\n\n* **Enabling Seamless Collaboration:**  Work on projects, share ideas, and collaborate with others in real-time through voice and video calls, chat features, and live streaming.\n* **Unleashing Creativity:** Share your passion through multimedia uploads, including photos, videos, and 3D images. Engage in discussions and feedback within a supportive community.\n* **Personalizing Your Experience:** Enjoy tailored content feeds curated to your interests, ensuring you never miss out on relevant updates and opportunities to connect.\n\n**[Platform Name]** prioritizes user privacy and data security, ensuring a safe and reliable environment for everyone. We utilize cutting-edge technology to ensure seamless user experiences and empower our community to thrive.\n\n**Join [Platform Name] today and discover a vibrant space where connections are made, creativity flourishes, and ideas take flight!**\n\n**[Call to action - e.g., Download our app now! | Visit our website to learn more.]**\n\nRemember to adjust the description based on your specific platform and target audience. Good luck! \n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  return result.response.text();
}

module.exports = run;
