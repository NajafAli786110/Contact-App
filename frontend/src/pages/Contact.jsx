import React from "react";

const contacts = [
  {
    name: "Atlassian JIRA",
    description: "Plan, track, and release great software.",
    icon: "📋",
  },
  {
    name: "Hubspot",
    description: "Sync contact and activity data between Dialin and hub.",
    icon: "✨",
  },
  {
    name: "GitHub",
    description: "Link pull requests and automate workflows.",
    icon: "💻",
  },
  {
    name: "Zapier",
    description: "Build custom automations and integrations with apps.",
    icon: "⚙️",
  },
  {
    name: "Notion",
    description: "Streamline software projects, sprints, and bug tracking.",
    icon: "📝",
  },
  {
    name: "Slack",
    description: "Streamline software projects, sprints, and bug tracking.",
    icon: "💬",
  },
  {
    name: "Zendesk",
    description: "Streamline software projects, sprints, and bug tracking.",
    icon: "📞",
  },
  {
    name: "Google Drive",
    description:
      "Link your Google account to share files across your entire team.",
    icon: "📂",
  },
  {
    name: "Figma",
    description:
      "A collaborative design Figma helps build meaningful products.",
    icon: "🎨",
  },
];

function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{contact.icon}</div>
              <h2 className="text-lg font-semibold">{contact.name}</h2>
              <p className="text-sm text-gray-500">{contact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
