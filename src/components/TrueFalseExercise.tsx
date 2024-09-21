"use client";

import React, { useState, useEffect } from "react";
import Button from "./ButtonUI";
import { Modal } from "antd";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Para manejar la sesión
import { useProgress } from "@/context/ProgressUserProvider";

interface TrueFalseExercise {
  text: string;
  correctAnswer: boolean;
}

function TrueFalseExerciseComponent() {
  const { percent, increaseProgress } = useProgress(); // Usamos el progreso
  const { data: session } = useSession(); // Sesión del usuario
  const router = useRouter();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [incorrect, setIncorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showContent, setShowContent] = useState<boolean>(false); // Control de bienvenida

  const exercises: TrueFalseExercise[] = [
    { text: "The sky is blue.", correctAnswer: true },
    { text: "Fish can fly.", correctAnswer: false },
    { text: "2 + 2 equals 4.", correctAnswer: true },
    { text: "The sun rises in the west.", correctAnswer: false },
    { text: "Cats are mammals.", correctAnswer: true },
  ];

  const currentExercise = exercises[currentExerciseIndex];

  const handleButtonClick = (answer: boolean) => {
    if (answer === currentExercise.correctAnswer) {
      setSelectedAnswer(answer);
      setIncorrect(false);

      increaseProgress(); // Incrementamos el progreso
      if (currentExerciseIndex + 1 === exercises.length) {
        setShowConfetti(true);
        setIsModalVisible(true);
      } else {
        setTimeout(() => {
          setSelectedAnswer(null);
          setCurrentExerciseIndex((prev) => prev + 1);
        }, 1000);
      }
    } else {
      setIncorrect(true);
      setTimeout(() => {
        setIncorrect(false);
      }, 1000);
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    router.push("/dashboard");
  };

  // Control del mensaje de bienvenida
  useEffect(() => {
    if (session) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [session]);

  return (
    <>
      {session ? (
        <>
          {!showContent ? (
            <div className="welcome-screen flex items-center justify-center h-[70px]">
              <div className="text-center">
                <h1 className="text-3xl sm:text-6xl text-white font-bold mb-4 animate-fadeIn">
                  ¡Bienvenido!
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 animate-fadeIn delay-500">
                  Buena suerte con los ejercicios :D
                </p>
              </div>
            </div>
          ) : (
            <div className="exercise-screen flex flex-col items-center justify-center h-[100px]">
              {showConfetti && <Confetti />}
              <div className="text-xl sm:text-3xl text-center relative p-5 sm:p-10 text-white animate-slideUp">
                <p className={`text-shadow ${incorrect ? "text-red-500" : "text-[#FCDE70]"}`}>
                  {currentExercise.text}
                </p>
              </div>

              <div className="flex justify-center items-center relative p-5 sm:p-10 gap-2 sm:gap-5 animate-slideUp">
                <Button
                  onClick={() => handleButtonClick(true)}
                  className={selectedAnswer === true ? "bg-green-500" : ""}
                >
                  Verdadero
                </Button>
                <Button
                  onClick={() => handleButtonClick(false)}
                  className={selectedAnswer === false ? "bg-red-500" : ""}
                >
                  Falso
                </Button>
              </div>

              {/* Modal para finalizar ejercicios */}
              <Modal
                title="¡Ejercicio Completado!"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalOk}
                okText="Volver al Dashboard"
              >
                <p>¡Felicitaciones! Has completado todos los ejercicios.</p>
              </Modal>
            </div>
          )}
        </>
      ) : null}
    </>
  );
}

export default TrueFalseExerciseComponent;
