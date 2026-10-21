import { useEffect, useState } from "react";
import { getSkills } from "../api/api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getSkills()
      .then((data) => {
        setSkills(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <h1>Skills</h1>

      {error && <p>{error}</p>}

      {skills.length === 0 && !error && (
        <p>Loading skills...</p>
      )}

      {skills.map((skill) => (
        <div key={skill.id}>
          <p>
            {skill.skillName} - Level {skill.proficiencyLevel}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Skills;