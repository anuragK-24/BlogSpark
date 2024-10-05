import React from "react";
import "./About.scss";
import GitHubIcon from '@mui/icons-material/GitHub';
import { Language, LinkedIn, Web } from "@mui/icons-material";

export default function About() {
  return (
    <div className="About">
      <h1 className="About_Heading">About</h1>
      <p className="About_Text">
        At BlogSpark, we believe in making content creation
        as straightforward and enjoyable as possible. Our platform is crafted
        for both aspiring and seasoned bloggers who want to focus on what they
        do best—writing.
      </p>
      <h2 className="About_Subheading">Why Choose Us?</h2>
      <p className="About_Text">
        <strong>Seamless Writing Experience:</strong> Our powerful markdown
        editor allows you to write and format your posts effortlessly. Whether
        you're drafting a quick note or composing a detailed article, our
        intuitive interface supports your creativity with real-time previews and
        simple commands.
      </p>
      <p className="About_Text">
        <strong>Beautiful, Clean Layouts:</strong> Readers deserve content
        that’s easy on the eyes. Our platform ensures that your posts are
        displayed with clean, well-organized formatting, making them a pleasure
        to read on any device.
      </p>
      <p className="About_Text">
        <strong>Customizable and Flexible:</strong> Tailor your posts to reflect
        your style. With markdown, you have full control over your content’s
        appearance, from headers and lists to links and images. The flexibility
        of markdown ensures that your content looks just the way you want it.
      </p>
      <p className="About_Text">
        <strong>Community and Collaboration:</strong> Engage with a community of
        like-minded bloggers and readers. Our platform encourages interaction
        through comments, sharing, and collaborations, fostering a vibrant
        ecosystem of knowledge and creativity.
      </p>
      <p className="About_Text">
        <strong>Focus on What Matters:</strong> We’ve removed the distractions,
        so you can focus on delivering high-quality content. Our platform is
        free of unnecessary frills, ensuring that your writing process is
        streamlined and efficient.
      </p>
      <h2 className="About_Subheading">About the Creator</h2>
      <p className="About_Text">
        This platform is brought to you by Anurag Kumar, a passionate DevOps engineer and web developer. Connect with him to explore more of his work and insights:
      </p>
      <ul className="About_Links">
        <li><a href="https://www.linkedin.com/in/anurag-kumar-4490ba1a6/" target="_blank" rel="noopener noreferrer"><LinkedIn/> LinkedIn</a></li>
        <li><a href="https://github.com/anuragK-24" target="_blank" rel="noopener noreferrer"><GitHubIcon/>  GitHub</a></li>
        <li><a href="https://anuragk24-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer"><Language/> Portfolio</a></li>
      </ul>
      <h2 className="About_Subheading">Join Us Today</h2>
      <p className="About_Text">
        Whether you're starting a personal blog, sharing professional insights,
        or building a community, BlogSpark provides the tools
        you need to succeed. Start writing, sharing, and connecting today—your
        story deserves to be told.
      </p>
    </div>
  );
}
